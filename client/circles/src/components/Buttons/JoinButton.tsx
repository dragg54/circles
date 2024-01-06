import React from 'react'
import { IoIosPeople } from 'react-icons/io'
import { JOIN_COMMUNITIES, LEAVE_COMMUNITY } from '../../graphql/mutations/community'
import { useMutation } from '@apollo/client'
import { CommunityType } from '../../types/Community'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '../../types/States'
import { joinCommunity } from '../../redux/Auth'

const JoinButton = ({ community }: { community: CommunityType }) => {
    const [joinCommunityMutation, { loading, error }] = useMutation(JOIN_COMMUNITIES)
    const dispatch = useDispatch()

    function handleJoinCommunity() {
        try {
            joinCommunityMutation({
                variables: {
                    comrsmunities: [community._id],
                }
            })
            if (!error) {
                dispatch(joinCommunity({ community }))
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <button onClick={handleJoinCommunity} className='bg-gray-700 text-white flex gap-2 text-xs px-2 py-1 rounded-md font-bold items-center'>
            <IoIosPeople />Join
        </button>
    )
}

export default JoinButton