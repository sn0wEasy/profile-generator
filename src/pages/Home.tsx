import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto text-center py-12">
      <h2 className="text-4xl font-bold mb-8 dark:text-white">
        自己紹介ページジェネレータ
      </h2>
      <p className="text-xl mb-8 dark:text-gray-300">
        自分のプロフィール情報を入力して、自己紹介ページを作成しましょう。
      </p>
      <Link
        to="/create"
        className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold tracking-wider hover:bg-blue-600 transition duration-200"
      >
        プロフィールを作成する
      </Link>
    </div>
  );
};

export default Home;
