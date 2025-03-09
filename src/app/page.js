"use client";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [searchWord, setSearchWord] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const searchFunction = async (e) => {
    e.preventDefault();

    if (!searchWord) {
      setUsers([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchWord}`
      );
      if (!response.ok) {
        alert("Ошибка при поиске пользователей");
      }
      const data = await response.json();
      const filteredUsers = data.items.filter((user) =>
        user.login.toLowerCase().includes(searchWord.toLowerCase())
      );

      setUsers(filteredUsers);
    } catch (error) {
      alert(error.message);
      setUsers([]);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <main>
        <form onSubmit={searchFunction} className="flex gap-2 justify-center">
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Введите имя пользователя GitHub"
            className="border rounded-xl px-4 md:w-200 sm:w-140"
          />
          <button
            type="submit"
            className="p-2 bg-black text-white border rounded-xl md:w-25 sm:w-20">
            Поиск
          </button>
        </form>

        {users.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl text-center mb-2 pt-4 pb-4">
              Результаты поиска
            </h2>
            <div className="border rounded-3xl  md:w-227">
              <ul className="flex flex-col gap-5 px-4 py-5 ">
                {users.map((user) => (
                  <li key={user.id} className="mb-2 flex gap-10 pl-10  ">
                    <p>{user.login}</p>
                    <a
                      href={user.html_url}
                      className="text-blue-500 hover:underline">
                      {user.html_url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
