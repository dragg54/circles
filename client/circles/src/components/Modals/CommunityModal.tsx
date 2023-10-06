import React, { ChangeEvent } from 'react'
import { HiOutlineComputerDesktop } from 'react-icons/hi2'
import { MdHowToVote, MdOutlineSchool, MdSportsSoccer } from 'react-icons/md'
import { PiMusicNotesSimpleLight } from 'react-icons/pi'
import { RiExchangeDollarLine } from 'react-icons/ri'

export const CommunityModal = ({communitySelectedHeading, name, handleformChange, value}: {communitySelectedHeading: string, name: string, handleformChange:(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> void, value: string}) => {
    return (
        <div className="relative inline-block w-64">
            <select className="text-gray-400 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" value={value} onChange={(e)=>handleformChange(e)} name={name}>
                <option value="" className=''>{communitySelectedHeading}</option>
                <option value="Music"> Music<PiMusicNotesSimpleLight className="bg-red-400" /></option>
                <option value="Tech"><HiOutlineComputerDesktop /> Tech</option>
                <option value="Politics"><MdHowToVote /> Politics</option>
                <option value="Education"><MdOutlineSchool /> Education</option>
                <option value="Business"><RiExchangeDollarLine /> Business</option>
                <option value="Sport"><MdSportsSoccer /> Sport</option>
                {communitySelectedHeading == "Community"? <option> Create Community</option>: ""}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-7 text-gray-500 w-7 mb-3 font-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8.293 11.293a1 1 0 011.414 0L12 13.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" /></svg>
            </div>
        </div>
    )
}
export default CommunityModal