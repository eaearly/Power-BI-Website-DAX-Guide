"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { TerminalCodeEditor } from "@/components/ui/terminal-code-editor";
import {
  Bookmark,
  StickyNote,
  Code2,
  Plus,
  Trash2,
  LogOut,
  Loader2,
  BookOpen,
  Clock,
  User as UserIcon,
  Save,
  KeyRound,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/* ── Types ── */
interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  createdAt: string;
}

interface NoteItem {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

/* ── localStorage helpers ── */
function getStorageKey(userId: string, type: string) {
  return `powerbihub_${userId}_${type}`;
}

function loadFromStorage<T>(userId: string, type: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(getStorageKey(userId, type));
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage<T>(userId: string, type: string, items: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getStorageKey(userId, type), JSON.stringify(items));
}

/* ── Framer Motion variants ── */
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const listItem = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 12, transition: { duration: 0.2 } },
};

/* ══════════════════════════════════════════════════════════════════════ */

export function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* Profile edit state */
  const [displayName, setDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  /* Bookmarks */
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [newBookmarkTitle, setNewBookmarkTitle] = useState("");
  const [newBookmarkUrl, setNewBookmarkUrl] = useState("");

  /* Notes */
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  /* ── Auth check ── */
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (!u) {
        router.push("/auth/login");
        return;
      }
      setUser(u);
      setDisplayName(
        u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split("@")[0] || ""
      );
      setBookmarks(loadFromStorage<BookmarkItem>(u.id, "bookmarks"));
      setNotes(loadFromStorage<NoteItem>(u.id, "notes"));
      setLoading(false);
    });
  }, [router]);

  /* Keep activeTab in sync with URL */
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value);
      router.replace(`/dashboard?tab=${value}`, { scroll: false });
    },
    [router]
  );

  /* ── Sign out ── */
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  /* ── Profile save ── */
  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    setProfileMsg(null);

    const supabase = createClient();

    try {
      // Update display name
      if (displayName.trim() && displayName !== getUserDisplayName()) {
        const { error } = await supabase.auth.updateUser({
          data: { full_name: displayName.trim(), name: displayName.trim() },
        });
        if (error) throw error;
      }

      // Update password
      if (newPassword) {
        if (newPassword.length < 6) {
          setProfileMsg({ type: "error", text: "Password must be at least 6 characters." });
          setSavingProfile(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          setProfileMsg({ type: "error", text: "Passwords do not match." });
          setSavingProfile(false);
          return;
        }
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
      }

      // Refresh user data
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);

      setNewPassword("");
      setConfirmPassword("");
      setProfileMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update profile.";
      setProfileMsg({ type: "error", text: message });
    } finally {
      setSavingProfile(false);
    }
  };

  /* ── Bookmark handlers ── */
  const addBookmark = () => {
    if (!newBookmarkTitle.trim() || !user) return;
    const item: BookmarkItem = {
      id: crypto.randomUUID(),
      title: newBookmarkTitle.trim(),
      url: newBookmarkUrl.trim() || "#",
      createdAt: new Date().toISOString(),
    };
    const updated = [item, ...bookmarks];
    setBookmarks(updated);
    saveToStorage(user.id, "bookmarks", updated);
    setNewBookmarkTitle("");
    setNewBookmarkUrl("");
  };

  const removeBookmark = (id: string) => {
    if (!user) return;
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    saveToStorage(user.id, "bookmarks", updated);
  };

  /* ── Note handlers ── */
  const addNote = () => {
    if (!newNoteTitle.trim() || !user) return;
    const item: NoteItem = {
      id: crypto.randomUUID(),
      title: newNoteTitle.trim(),
      content: "",
      updatedAt: new Date().toISOString(),
    };
    const updated = [item, ...notes];
    setNotes(updated);
    saveToStorage(user.id, "notes", updated);
    setNewNoteTitle("");
    setActiveNoteId(item.id);
  };

  const updateNoteContent = (id: string, content: string) => {
    if (!user) return;
    const updated = notes.map((n) =>
      n.id === id ? { ...n, content, updatedAt: new Date().toISOString() } : n
    );
    setNotes(updated);
    saveToStorage(user.id, "notes", updated);
  };

  const removeNote = (id: string) => {
    if (!user) return;
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveToStorage(user.id, "notes", updated);
    if (activeNoteId === id) setActiveNoteId(null);
  };

  const activeNote = notes.find((n) => n.id === activeNoteId);

  /* ── User helpers ── */
  const getUserDisplayName = () => {
    if (!user) return "";
    return (
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  const getUserFirstName = () => {
    return getUserDisplayName().split(" ")[0];
  };

  const getUserAvatar = () =>
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
    >
      {/* ── Profile header ── */}
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-border shadow-md">
            <AvatarImage src={getUserAvatar() || undefined} alt={getUserDisplayName()} referrerPolicy="no-referrer" />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Hello, {getUserFirstName()}!</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={handleSignOut}>
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </motion.div>

      <Separator className="mb-8" />

      {/* ── Tabs ── */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.1 }}>
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="profile" className="gap-1.5">
              <UserIcon className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="gap-1.5">
              <Bookmark className="h-4 w-4" />
              Bookmarks
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-1.5">
              <StickyNote className="h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="code-editor" className="gap-1.5">
              <Code2 className="h-4 w-4" />
              Code Editor
            </TabsTrigger>
          </TabsList>
        </motion.div>

        {/* ══════════ PROFILE TAB ══════════ */}
        <TabsContent value="profile">
          <motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.15 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-yellow-700 dark:text-primary" />
                  Edit Profile
                </CardTitle>
                <CardDescription>Update your display name and password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Display name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="focus-ring w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                    placeholder="Your display name"
                  />
                </div>

                {/* Email (read-only) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed here.</p>
                </div>

                <Separator />

                {/* Password change */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-semibold">
                    <KeyRound className="h-4 w-4" />
                    Change Password
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="focus-ring w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                        placeholder="Min. 6 characters"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="focus-ring w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                        placeholder="Re-enter password"
                      />
                    </div>
                  </div>
                </div>

                {/* Status message */}
                <AnimatePresence mode="wait">
                  {profileMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
                        profileMsg.type === "success"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {profileMsg.type === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0" />
                      )}
                      {profileMsg.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  className="gap-1.5"
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                >
                  {savingProfile ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ══════════ BOOKMARKS TAB ══════════ */}
        <TabsContent value="bookmarks">
          <motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.15 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-yellow-700 dark:text-primary" />
                  Bookmarks
                </CardTitle>
                <CardDescription>Save links to your favorite DAX references, articles, and resources.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add form */}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Bookmark title"
                    value={newBookmarkTitle}
                    onChange={(e) => setNewBookmarkTitle(e.target.value)}
                    className="focus-ring flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                    onKeyDown={(e) => e.key === "Enter" && addBookmark()}
                  />
                  <input
                    type="url"
                    placeholder="URL (optional)"
                    value={newBookmarkUrl}
                    onChange={(e) => setNewBookmarkUrl(e.target.value)}
                    className="focus-ring flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                    onKeyDown={(e) => e.key === "Enter" && addBookmark()}
                  />
                  <Button size="sm" className="gap-1.5" onClick={addBookmark}>
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </Button>
                </div>

                <Separator />

                {/* Bookmark list */}
                {bookmarks.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-muted-foreground"
                  >
                    <BookOpen className="mb-3 h-10 w-10 opacity-40" />
                    <p className="text-sm">No bookmarks yet. Add your first one above!</p>
                  </motion.div>
                ) : (
                  <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-2">
                    <AnimatePresence>
                      {bookmarks.map((bm) => (
                        <motion.div
                          key={bm.id}
                          variants={listItem}
                          exit="exit"
                          layout
                          className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-muted/50"
                        >
                          <div className="min-w-0 flex-1">
                            <a
                              href={bm.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium hover:text-yellow-700 dark:hover:text-primary hover:underline"
                            >
                              {bm.title}
                            </a>
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                              {bm.url !== "#" ? bm.url : "No URL"} · {new Date(bm.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                            onClick={() => removeBookmark(bm.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ══════════ NOTES TAB ══════════ */}
        <TabsContent value="notes">
          <motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.15 }}>
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              {/* Sidebar */}
              <Card className="h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <StickyNote className="h-4 w-4 text-yellow-700 dark:text-primary" />
                    Your Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="New note title"
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      className="focus-ring flex-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs placeholder:text-muted-foreground"
                      onKeyDown={(e) => e.key === "Enter" && addNote()}
                    />
                    <Button size="sm" className="h-7 w-7 p-0" onClick={addNote}>
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <Separator />

                  {notes.length === 0 ? (
                    <p className="py-4 text-center text-xs text-muted-foreground">No notes yet</p>
                  ) : (
                    <div className="max-h-[400px] space-y-1 overflow-y-auto">
                      <AnimatePresence>
                        {notes.map((note) => (
                          <motion.div
                            key={note.id}
                            variants={listItem}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            layout
                            className={`group flex cursor-pointer items-center justify-between rounded-md px-2.5 py-2 text-sm transition-colors ${
                              activeNoteId === note.id
                                ? "bg-primary/10 text-yellow-700 dark:text-primary"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => setActiveNoteId(note.id)}
                          >
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-medium">{note.title}</p>
                              <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <Clock className="h-2.5 w-2.5" />
                                {new Date(note.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNote(note.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Editor */}
              <Card>
                <CardContent className="p-0">
                  {activeNote ? (
                    <motion.div
                      key={activeNote.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col"
                    >
                      <div className="border-b border-border px-4 py-3">
                        <h3 className="text-sm font-semibold">{activeNote.title}</h3>
                        <p className="text-[10px] text-muted-foreground">
                          Last updated: {new Date(activeNote.updatedAt).toLocaleString()}
                        </p>
                      </div>
                      <textarea
                        value={activeNote.content}
                        onChange={(e) => updateNoteContent(activeNote.id, e.target.value)}
                        className="min-h-[350px] resize-none bg-background px-4 py-3 text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
                        placeholder="Start writing your note here..."
                      />
                    </motion.div>
                  ) : (
                    <div className="flex min-h-[350px] flex-col items-center justify-center text-muted-foreground">
                      <StickyNote className="mb-3 h-10 w-10 opacity-40" />
                      <p className="text-sm">Select a note or create a new one</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>

        {/* ══════════ CODE EDITOR TAB ══════════ */}
        <TabsContent value="code-editor">
          <motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.15 }} className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Code2 className="h-5 w-5 text-yellow-700 dark:text-primary" />
                Code Editor
              </h3>
              <p className="text-sm text-muted-foreground">
                Write and validate DAX or SQL code. Use the dropdown to switch between editors.
                Each editor checks syntax, parentheses, common patterns, and suggests fixes for errors.
              </p>
            </div>
            <TerminalCodeEditor />
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
