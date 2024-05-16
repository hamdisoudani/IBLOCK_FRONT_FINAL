
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


import Avatar from "boring-avatars";
import { ScrollArea } from "./scroll-area";
import { accessTokenType } from "../context/userprofile.context";
type Props = {
  items: accessTokenType[];
};

export const AnimatedTooltip = ({ items }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const getFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase();
  };
  return (
    <>
      {items.slice(0, 5).map((item, idx) => (
        <div
          className="mr-[-0.36rem]  relative group z-[9999]"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(Number(item.userId))}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === Number(item.userId) && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 100,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 100, y: 30, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
                zIndex: 9999,
              }}
              className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black shadow-xl px-5 py-2 !z-[99999]"
            >
              <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-2px " />
              <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-2px " />
              <div className="font-bold text-white relative z-30 text-base">
                {item.name}
              </div>
              <div className="text-white text-xs">{item.role}</div>
            </motion.div>
          )}
          
          {/* PC & TABLET */}
          <div className="relative hidden sm:block">
            <p className="absolute z-50 left-3 right-0 bottom-0 top-1 text-md">{getFirstLetter(item.name)}</p>
            <Avatar
              key={item.userId}
              size={32}
              name={item.name}
              variant="marble"
              colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
            />
          </div>

          {/* MOBILE */}
          <div className="relative block sm:hidden">
            <p className="absolute z-50 left-[0.6rem] right-0 bottom-0 top-1 text-md">{getFirstLetter(item.name)}</p>
            <Avatar
              key={item.userId}
              size={30}
              name={item.name}
              variant="marble"
              colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
            />
          </div>
        </div>
        
      ))}
      {items.length > 5 && (
        <DropdownMenuCheckboxes items={items.slice(5)} />
      )}
    </>
  );
};


export function DropdownMenuCheckboxes({ items }: {items: accessTokenType[] }) {
  const [selectedItems, setSelectedItems] = React.useState<accessTokenType[]>([]);

  const handleCheckedChange = (index: number, checked: boolean) => {
    const updatedSelectedItems = [...selectedItems];
    if (checked) {
      updatedSelectedItems.push(items[index]);
    } else {
      updatedSelectedItems.splice(index, 1);
    }
    setSelectedItems(updatedSelectedItems);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative z-[9999]">
        <div className="relative hidden sm:block">
          <Avatar
            size={32}
            name="Add"
            variant="marble"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <p className="absolute left-0 right-0 bottom-0 top-1 text-md">+5</p>
        </div>
        <div className="relative block sm:hidden">
          <Avatar
            size={30}
            name="Add"
            variant="marble"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <p className="absolute left-0 right-0 bottom-0 top-1 text-md">+5</p>
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-[250px] z-[9999]">
      <ScrollArea className="h-[200px]"> 
          {items.map((item, index) => (
            <DropdownMenuCheckboxItem
              key={item.name}
              checked={selectedItems.some(selectedItem => selectedItem.name === item.name)}
              onCheckedChange={checked => handleCheckedChange(index, checked)}
              className="flex flex-row justify-between p-0 text-left gap-2 space-y-1 "
            >
              <Avatar
                size={30}
                name={item.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <p className="truncate ">{item.name}</p>
              {item.role && <span className="text-xs text-gray-500 truncate ">{item.role}</span>}
            </DropdownMenuCheckboxItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
      
    </DropdownMenu>
  );
}
