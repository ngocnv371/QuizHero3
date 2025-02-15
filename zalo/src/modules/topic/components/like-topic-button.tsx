import React, { useCallback } from 'react'
import { Button, Icon, useSnackbar } from 'zmp-ui'

import { useExplorer } from '@/modules/explorer/use-explorer'

import { useProfile } from '../../auth/use-auth'

interface LikeTopicButtonProps {
  topicId: string
}

const LikeTopicButton: React.FC<LikeTopicButtonProps> = ({ topicId }) => {
  const { profile: user } = useProfile()
  const { actions } = useExplorer()
  const liked = useExplorer((f) => f.favourites.includes(topicId))
  const { openSnackbar } = useSnackbar()

  const handleLike = useCallback(
    async () => {
      try {
        console.log('was liked?', liked)
        await actions.updateFavourite({ topicId, liked: !liked })
        openSnackbar({
          text: liked ? 'Unliked the topic' : 'Liked the topic',
          type: 'success',
          duration: 3000,
        })
      } catch (error) {
        console.error('Failed to like the topic', error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, topicId, actions, liked],
  )

  return (
    <Button
      className="relative after:content-[''] after:absolute after:-inset-2 after:bg-transparent mr-2"
      icon={<Icon icon={liked ? 'zi-heart-solid' : 'zi-heart'} />}
      onClick={handleLike}
      variant={liked ? 'primary' : 'secondary'}
      size="large"
    />
  )
}

export default LikeTopicButton
