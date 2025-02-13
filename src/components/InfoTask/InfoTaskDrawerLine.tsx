import { ReactNode, useMemo } from "react";
import stl from "./InfoTaskDrawerLine.module.scss";
import { CustomIcon } from "../../utils/customIcon";
import { ITask } from "../../types/TTasks";
import { Time, ArrowLeft, ArrowRight, StatusAcknowledge } from "@ricons/carbon";
import { Input } from 'antd';
import { inscrInfoTitles as tips } from "../../data/inscriptions";
import { capitalize } from "../../utils/capitilize";


const { TextArea } = Input;

interface IInfoTaskDrawerLine {
    dataItem: ITask;
    description: string;
    setNewDescription: (text: string) => void;
}

type TInfoTaskLine = {
    name: string; 
    value: string; 
    icon: ReactNode;
};

const InfoTaskDrawerLine: React.FC<IInfoTaskDrawerLine> = ({ dataItem, setNewDescription, description }) => {

    const infoTaskLines: TInfoTaskLine[] = useMemo(() => [
        {
            name: tips.timeOfCreation,
            value: dataItem.timeOfCreation,
            icon: CustomIcon(<Time />)
        },
        {
            name: tips.timeStart,
            value: dataItem.timeStart,
            icon: CustomIcon(<ArrowLeft />)
        },
        {
            name: tips.timeEnd,
            value: dataItem.timeEnd,
            icon: CustomIcon(<ArrowRight />)
        },
        {
            name: tips.status,
            value: dataItem.isCompleted ? tips.completedTask : tips.activeTask,
            icon: CustomIcon(<StatusAcknowledge />)
        }
    ], [dataItem.isCompleted]);


    const changeInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const targetText = e.target.value;
        setNewDescription(capitalize(targetText));
    }
    
    return (
        <div className={stl.drawer_container}>
            <ul className={stl.drawer_list}>
                {
                    infoTaskLines.map((item: TInfoTaskLine) => {
                        const isDate = item.name !== tips.status;
                        const value = isDate ? item.value.split(" ") : item.value;

                        return (
                            <li key={item.value + item.name}>
                                <div className={stl.drawer_info_line}>
                                    <div className={stl.drawer_name_block}>
                                        <div className={stl.icon}>
                                            {item.icon}
                                        </div>
                                        <div className={stl.title}>
                                            <h3>{item.name}</h3>
                                        </div>
                                    </div>
                                    <div className={stl.drawer_value}>
                                        <div className={item.name === tips.status && `${dataItem.isCompleted ? stl.completedInscr : stl.uncompletedInsc}`}>
                                        {
                                            isDate ?  
                                                <div>
                                                    {value[0]} <span className={stl.full_date}>{value[1]}</span>
                                                </div> 
                                                : value
                                        }
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div className={stl.description}>
                <div className={stl.title + ` ${stl.description_title}`}>
                    <h2>{tips.descriptionTitle}</h2>
                </div>
                <TextArea
                    rows={4}
                    placeholder={tips.enterDescription}
                    autoSize={{ minRows: 15, maxRows: 20 }}
                    style={{ width: '100%', height: '100%' }}
                    showCount={true}
                    value={description}
                    maxLength={1500}
                    onChange={changeInputValue}
                />    
            </div>
        </div>
    )
}

export default InfoTaskDrawerLine;
