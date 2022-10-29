import React from "react";

interface VideoProps {
  player: string;
  type: string;
}
const Videos = ({ player, type }: VideoProps) => {

  return (
    <div className={`videos player-${type}`} dangerouslySetInnerHTML={{ __html: player }}></div>
  );

};

export { Videos };
