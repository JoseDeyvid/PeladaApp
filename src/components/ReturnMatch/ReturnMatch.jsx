import React, { useEffect, useState } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";

const ReturnMatch = ({
  teams,
  setTeams,
  teamsPlaying,
  setTeamsPlaying,
  playersPerTeam,
  historyOfMatchs,
  setHistoryOfMatchs,
}) => {
  useEffect(() => {
    if (
      historyOfMatchs[historyOfMatchs.length - 1][0] !== teamsPlaying[0] ||
      historyOfMatchs[historyOfMatchs.length - 1][1] !== teamsPlaying[1]
    ) {
      setHistoryOfMatchs([...historyOfMatchs, teamsPlaying]);
      localStorage.setItem(
        "@historyOfMatchs",
        JSON.stringify([
          ...(JSON.parse(localStorage.getItem("@historyOfMatchs")) || [[0, 1]]),
          teamsPlaying,
        ])
      );
    }
  }, [teamsPlaying]);

  const saveInLS = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
  };

  const returnMatchOnHandler = () => {
    if (historyOfMatchs.length > 1) {
      historyOfMatchs.pop();
      setTeamsPlaying(historyOfMatchs[historyOfMatchs.length - 1]);
      saveInLS("@teamsPlaying", historyOfMatchs[historyOfMatchs.length - 1]);

      const playersToRemove = playersPerTeam - teams[teams.length - 1].length;
      teams.pop();

      for (let i = 0; i < playersToRemove; i++) {
        teams[teams.length - 1].pop();
      }
      saveInLS("@historyOfMatchs", historyOfMatchs);
      saveInLS("@teams", teams);
    }
  };

  return (
    <div>
      <button onClick={returnMatchOnHandler}>
        <BsArrowReturnLeft />
      </button>
    </div>
  );
};

export default ReturnMatch;
