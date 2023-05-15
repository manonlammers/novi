import React from 'react'
import styles from './Components.module.scss'

import Typography from 'components/Typography/Typography'
import Button from 'components/Button/Button'

export const Components = () => {
    return (
        <div className={styles.components}>
            <Typography variant="h2" className={styles.sectionHeader}>Typography</Typography>
            <section>
                <Typography variant="h1">h1. Heading</Typography>
                <Typography variant="h2">h2. Heading</Typography>
                <Typography variant="h3">h3. Heading</Typography>
                <Typography variant="h4">h4. Heading</Typography>
                <Typography variant="h5">h5. Heading</Typography>
                <Typography variant="h6">h6. Heading</Typography>
                <Typography variant="subtitle1">subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur.</Typography>
                <Typography variant="subtitle2">subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur.</Typography>
                <Typography variant="body1">body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
                <Typography variant="body2">body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
                <Typography variant="button">BUTTON TEXT</Typography>
                <Typography variant="caption">caption text</Typography>
            </section>

            <section>
                <Typography variant="h2" className={styles.sectionHeader}>Buttons</Typography>
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button disabled>Disabled</Button>
            </section>

            <section>
                <Typography variant="h2" className={styles.sectionHeader}>Input</Typography>

                TODO
            </section>
        </div>
    )
}
export default Components
