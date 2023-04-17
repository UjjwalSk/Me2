import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import superheroes from 'superheroes';

const Room = () => {
  const { id } = useParams();
  const myMeeting = async (e) => {
    const appID = 1004657349;
    const serverSecret = "9d8001c46939426fa6e63a8e8e847b82";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      id,
      Date.now().toString(),
      superheroes.random()
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: e,
      sharedLinks: [{
        url: window.location.origin + window.location.pathname + '?roomID=' + id,
      }],
      onUserAvatarSetter: (userList) => {
        userList.forEach(user => {
          user.setUserAvatar(`https://i.pravatar.cc/300?t=${Math.random() * 1000}`)
        })
      },
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference
      },
    })
  }
  return (
    <div className='room-page'>
      <div ref={myMeeting} />
    </div>
  )
}

export default Room