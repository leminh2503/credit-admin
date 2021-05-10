import React, {useState} from 'react';
import {
    Form,
    Select,
    InputNumber,
    DatePicker,
    Switch,
    Slider,
    Button,
    Popover
} from "antd";
import {
    EllipsisOutlined,
    PlusCircleOutlined,
    UnorderedListOutlined,
    LayoutOutlined,
    CalendarOutlined,
    FontSizeOutlined,
    PictureOutlined,
    SelectOutlined
} from '@ant-design/icons';
import Link from "next/link";
// import Draggable from 'react-draggable';

const FormItem = Form.Item;
const Option = Select.Option;

export default function Test({data}) {
    let textLatestId = 0;
    const [textNodes, setTextNodes] = useState([]);
    const [position, setPosition] = useState({x: 0, y: 0});

    const handleDragStop = (_: any, ui: { node: HTMLElement; x: number; y: number; lastX: number, lastY: number, deltaX: number, deltaY: number}) => {
        console.log(ui.node.id, ui.x, ui.y, ui.lastX, ui.lastY, ui.deltaX, ui.deltaY)
        const newTextNodes = textNodes.map(node => {
            if (node.id === ui.node.id) {
                node.x = node.x + ui.deltaX;
                node.y =  node.y + ui.deltaY
            }
            return node
        })
        setTextNodes(newTextNodes);
    };

    const addText = () => {
        setTextNodes([...textNodes, {
            id: "TEXT" + textLatestId,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            content: "ABCDEFAFDSAFDSAF"
        }])
        textLatestId++
    }

    const elementContent = (
        <div className="builder-element-picker">
            <div className="builder-element-picker-item" onClick={addText}>
                <div className="element-icon-container">
                    <FontSizeOutlined/>
                </div>
                <span className="element-title">
                    Tiêu đề
                </span>
            </div>
            <div className="builder-element-picker-item">
                <div className="element-icon-container">
                    <PictureOutlined/>
                </div>
                <span className="element-title">
                    Hình ảnh
                </span>
            </div>
            <div className="builder-element-picker-item">
                <div className="element-icon-container">
                    <SelectOutlined/>
                </div>
                <span className="element-title">
                    Nút bấm
                </span>
            </div>
        </div>
    )


    return (
        <div className="test_playground_page">
            {/*<Draggable handle=".menu-handle">*/}
            {/*    <div className="builder-menu" style={{top: 100, left: 20}}>*/}
            {/*        <div className="menu-handle">*/}
            {/*            <EllipsisOutlined/>*/}
            {/*        </div>*/}
            {/*        <Popover*/}
            {/*            overlayClassName="test_playground_page-builder_element_picker_container"*/}
            {/*            placement="right"*/}
            {/*            content={elementContent}*/}
            {/*            trigger="click"*/}
            {/*        >*/}
            {/*            <div className="builder-menu-item">*/}
            {/*                <PlusCircleOutlined className="builder-menu-item-icon"/>*/}
            {/*                <span>Thêm mới</span>*/}
            {/*            </div>*/}
            {/*        </Popover>*/}
            {/*        <div className="builder-menu-item">*/}
            {/*            <UnorderedListOutlined className="builder-menu-item-icon"/>*/}
            {/*            <span>Section</span>*/}
            {/*        </div>*/}
            {/*        <div className="builder-menu-item">*/}
            {/*            <CalendarOutlined className="builder-menu-item-icon"/>*/}
            {/*            <span>Popup</span>*/}
            {/*        </div>*/}
            {/*        <div className="builder-menu-item">*/}
            {/*            <LayoutOutlined className="builder-menu-item-icon"/>*/}
            {/*            <span>Layer</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Draggable>*/}


            {/* Render Text */}
            {/*{textNodes.map(node => (*/}
            {/*    // <Draggable position={position} onStop={handleDragStop} key={node.id}>*/}
            {/*    //     <div id={node.id} style={{position: "absolute", top: node.y, left: node.x}}>*/}
            {/*    //         {node.content}*/}
            {/*    //     </div>*/}
            {/*    // </Draggable>*/}
            {/*))}*/}

        </div>
    )
}

export const getStaticProps = async () => {
    const data = []
    return {
        props: {
            data
        }
    }
}