import {FC} from 'react';
import Button from "@/ui/button/Button.tsx";

const About: FC = () => {
    const handleClickButton = () => {
        console.log('[8] 🌻: ')
    }

    return (
        <div>
            <Button title={'Test'} callback={handleClickButton}/>
        </div>
    );
};

export default About;
