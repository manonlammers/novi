import React from 'react'
import styles from './Components.module.scss'

import { useModal } from 'components/Modal/ModalProvider'
import Typography from 'components/Typography/Typography'
import Button from 'components/Button/Button'
import TextField from 'components/Textfield/TextField'
import Dropdown from 'components/Dropdown/Dropdown'
import Modal from 'components/Modal/Modal'

export const Components = () => {
    const modal = useModal()

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
                <div className={styles.inputSectionContent}>
                    <TextField
                        label="Normal"
                    />
                    <TextField
                        label="Disabled"
                        value="Hello World"
                        disabled={true}
                    />
                    <TextField
                        label="Label"
                        value="Default Value"
                        helpText="Help text"
                    />
                    <TextField
                        label="Error"
                        value="Hello World"
                        error="Error message"
                    />
                </div>
            </section>

            <section>
                <Typography variant="h2" className={styles.sectionHeader}>Modals</Typography>
                <div>
                    <Button
                        onClick={() => modal.showModal({
                            title: 'Modal example',
                            children: (
                                <div>
                                    <Typography gutterBottom={false}>Content</Typography>
                                </div>
                            )
                        })}
                    >
                        Show Modal
                    </Button>
                </div>
            </section>

            <section>
                <Typography variant="h2" className={styles.sectionHeader}>Dropdowns</Typography>
                <div>
                    <Dropdown
                        trigger={<Typography>Click me</Typography>}
                        menu={[
                            <div onClick={() => console.log('CLICKED')}>Menu item 1</div>,
                            <div>Menu item 2</div>
                        ]}
                    />
                </div>
            </section>

            <section>
                <Typography variant="h2" className={styles.sectionHeader}>Dropdown</Typography>
                <Dropdown
                    trigger={<Typography>Dropdown</Typography>}
                    menu={[
                        <div>Menu 1</div>,
                        <div>Menu 2</div>
                    ]}
                />
            </section>
        </div>
    )
}
export default Components
