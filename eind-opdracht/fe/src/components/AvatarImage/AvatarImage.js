import React, { useRef, useState } from 'react'
import cx from 'classnames'

import * as userAPI from 'api/user'
import { useUser } from 'components/UserProvider/UserProvider'
import styles from './AvatarImage.module.scss'
import avatarImg from 'assets/avatar-img.jpeg'

const AvatarImage = (props) => {
    const { user } = useUser()

    const inputRef = useRef(null)
    const [image, setImage] = useState(user?.avatar?.data ? `data:image/png;base64,${user.avatar.data}` : avatarImg)

    const handleAvatarClick = () => {
        inputRef.current.click()
    }

    const handleInputChange = async (e) => {
        try {
            const image = e.target.files[0]
            const formData = new FormData()
            formData.append('file', image, image.name)
            const response = await userAPI.updateAvatar(user.id, formData)
            if (response.status !== 200) {
                // TODO: show pretty error alert component
            }
            setImage(URL.createObjectURL(image))
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={cx(styles.component, props.className)}>
            <img
                className={styles.image}
                alt="avatar-image"
                src={image}
                onClick={handleAvatarClick}
            />

            <input
                ref={inputRef}
                type="file"
                name="image"
                className={styles.input}
                onChange={handleInputChange}
            />
        </div>
    )
}

export default AvatarImage
