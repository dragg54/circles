import { BiCameraMovie } from "react-icons/bi";
import { FiMusic } from "react-icons/fi";
import { GiCommercialAirplane, GiLoincloth, GiTrackedRobot } from "react-icons/gi";
import { MdHowToVote, MdOutlineSportsSoccer } from "react-icons/md";
import { SiHtmlacademy } from "react-icons/si";
import { TbBusinessplan } from "react-icons/tb";
import { Community } from "../types/Community";
import { BsMusicPlayer } from "react-icons/bs";


export const commmunityData = [
    {
        communityName: Community.Movie,
        communityIcon: <FiMusic />,
    },
    {
        communityName: Community.Politics,
        communityIcon: <MdHowToVote />
    },
    {
        communityName:Community.Education,
        communityIcon: <SiHtmlacademy />
    },
    {
        communityName:Community.Music,
        communityIcon: <BsMusicPlayer />
    },
    {
        communityName: Community.Sport,
        communityIcon: <MdOutlineSportsSoccer />
    },
    {
        communityName: Community.Fashion,
        communityIcon: <GiLoincloth />
    },
    {
        communityName: Community.Movie,
        communityIcon: <BiCameraMovie />
    },
    {
        communityName: Community.Travel,
        communityIcon: <GiCommercialAirplane />
    },
    {
        communityName: Community.Business,
        communityIcon: <TbBusinessplan />
    },
    {
        communityName: Community.Tech,
        communityIcon: <GiTrackedRobot />
    },
]
