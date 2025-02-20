"use client";

import Image from "next/image";
import React from "react";

const newsData = [
  {
    id: 1,
    image: "/images/latest-news/img1.jpeg",
    title: "Breaking News: Market Hits Record High",
    text: "The stock market reaches an all-time high with major indices showing gains...",
    date: "Feb 20, 2025 | 10:30 AM",
  },
  {
    id: 2,
    image: "/images/latest-news/img2.jpeg",
    title: "New AI Breakthrough Announced",
    text: "Researchers have unveiled a new AI model capable of reasoning like humans...",
    date: "Feb 19, 2025 | 03:45 PM",
  },
  {
    id: 3,
    image: "/images/latest-news/img6.jpeg",
    title: "Championship Final: An Epic Showdown",
    text: "Last night's championship final was one for the history books...",
    date: "Feb 18, 2025 | 08:00 PM",
  },
  {
    id: 4,
    image: "/images/latest-news/img4.jpeg",
    title: "Tech Giants Merge in Billion-Dollar Deal",
    text: "Two leading tech firms have announced a historic merger...",
    date: "Feb 17, 2025 | 11:15 AM",
  },
  {
    id: 5,
    image: "/images/latest-news/img9.jpeg",
    title: "Government Announces New Policy Changes",
    text: "Officials have revealed new policies that aim to improve economic stability...",
    date: "Feb 16, 2025 | 02:30 PM",
  },
  {
    id: 6,
    image: "/images/latest-news/img6.jpeg",
    title: "Space Mission Successfully Lands on Mars",
    text: "The latest space mission has successfully touched down on Mars...",
    date: "Feb 15, 2025 | 06:00 AM",
  },
  {
    id: 7,
    image: "/images/latest-news/img1.jpeg",
    title: "Medical Breakthrough in Cancer Research",
    text: "Scientists have made significant progress in developing a new cancer treatment...",
    date: "Feb 14, 2025 | 09:45 AM",
  },
  {
    id: 8,
    image: "/images/latest-news/img4.jpeg",
    title: "Climate Summit: Nations Agree on Green Policies",
    text: "World leaders have agreed on a series of green policies...",
    date: "Feb 13, 2025 | 01:20 PM",
  },
  {
    id: 9,
    image: "/images/latest-news/img9.jpeg",
    title: "Education Reform: Major Changes Coming",
    text: "The education sector is set to undergo major reforms...",
    date: "Feb 12, 2025 | 05:10 PM",
  },
  {
    id: 10,
    image: "/images/latest-news/img1.jpeg",
    title: "New Blockbuster Movie Breaks Records",
    text: "The latest blockbuster movie has shattered box office records...",
    date: "Feb 11, 2025 | 07:30 PM",
  },
];

const LatestNews = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      <div className="space-y-6">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="md:w-4/12 w-full relative">
              <Image
                src={news.image}
                alt={news.title}
                width={250}
                height={180}
                className="w-full h-[180px] object-cover"
                priority
              />
            </div>
            <div className="md:w-8/12 w-full p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{news.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{news.text}</p>
              </div>
              <span className="text-gray-500 text-xs mt-3">{news.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
