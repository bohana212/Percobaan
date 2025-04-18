import { useState } from "react";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  const handlePost = () => {
    const bannedWords = ["judol", "18+", "bokep"];
    const isBanned = bannedWords.some(word => text.toLowerCase().includes(word));
    if (isBanned) return alert("Konten dilarang! Akun diblokir (simulasi).");

    setPosts([{ text, liked: false }, ...posts]);
    setText("");
  };

  const toggleLike = (index) => {
    const newPosts = [...posts];
    newPosts[index].liked = !newPosts[index].liked;
    setPosts(newPosts);
  };

  return (
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="What's happening?" className="w-full border p-2 mb-2 rounded" />
      <button onClick={handlePost} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Post</button>
      {posts.map((post, i) => (
        <div key={i} className="border p-2 mb-2 rounded bg-gray-50">
          <p>{post.text}</p>
          <button onClick={() => toggleLike(i)} className={`mt-1 ${post.liked ? "text-red-500" : "text-blue-500"}`}>
            {post.liked ? "Liked" : "Like"}
          </button>
        </div>
      ))}
    </div>
  );
    }
