import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title';
import Footer from '../Footer';
import Box from '../UI/Box';

const HomePage = () => {
  return (
    <>
      <title>Noita投票箱导航页</title>
      <main className="flex-grow flex flex-col justify-center items-center text-center space-y-10">
        <Box className="py-8 px-6">
          <h1 className="text-5xl font-bold text-white mb-8" style={{ textShadow: '2px 2px 4px #000000' }}>
            Noita 法术/天赋 投票箱
          </h1>
          <div className="flex flex-col space-y-6">
            {/* Spell Button */}
            <Link to="/spells" className="flex items-center p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200 ease-in-out">
              <div className="w-1/3 pr-4">
                <Title imageFor="spell" />
              </div>
              <div className="flex-grow text-left">
                <p className="text-2xl font-bold text-white">进入法术投票箱</p>
                <p className="text-gray-400 mt-1">根据你的喜好，对成对出现的法术进行投票。</p>
              </div>
            </Link>

            {/* Perk Button */}
            <Link to="/perks" className="flex items-center p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200 ease-in-out">
              <div className="w-1/3 pr-4">
                <Title imageFor="perk" />
              </div>
              <div className="flex-grow text-left">
                <p className="text-2xl font-bold text-white">进入天赋投票箱</p>
                <p className="text-gray-400 mt-1">根据你的喜好，对成对出现的天赋进行投票。</p>
              </div>
            </Link>
          </div>
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;