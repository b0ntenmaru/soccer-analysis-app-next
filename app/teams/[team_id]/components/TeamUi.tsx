"use client";
import { Team } from '@/app/types';

const TeamUi = (props: { team: Team}) => {

  return (
    <>
      {JSON.stringify(props.team)}
    </>
  );
};

export default TeamUi;
