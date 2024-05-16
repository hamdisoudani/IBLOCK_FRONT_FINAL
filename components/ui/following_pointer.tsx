"use client";
import React, { useEffect, useState } from "react";

import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Socket } from "socket.io-client";
import { accessTokenType, useProfileContext } from "../context/userprofile.context";
import throttle from "lodash.throttle";
import { generateColor } from "@marko19907/string-to-color";


type UserUpdateCursors = {
  payload: {
    x: number,
    y:number,
    isInside:boolean,
  },
  user: accessTokenType
}
export const FollowerPointerCard = ({
  children,
  className,
  title,
  socket,
  role
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  socket: Socket | null,
  role: string
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState<boolean>(false); // Add this line
  const { userInformation } = useProfileContext();
  const [usersCursor, setUsersCursor] = useState<UserUpdateCursors[]>([]);
  const [owner, setOwner] = useState<boolean>(false);
  
useEffect(() => {
  if (socket) {
    socket.on("cursor_changes", (data) => {
      // Check if the user is not the one who sent the data
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      if (data.user.userId.toString() !== userInformation?.userId) {
        // Check if the user is not already in the list
        const userIndex = usersCursor.find(userCursor => userCursor.user.userId == data.user.userId);
        setUsersCursor(prev => {
          const userIndex = prev.findIndex(user => user.user.userId === data.user.userId);
          if (userIndex === -1) {
            // If the user is not in the array, add their cursor data
            return [...prev, data];
          } else {
            // Check if the user left the component
            if(data.payload.left == false) {
              const updatedUsers = [...prev];
              updatedUsers.splice(userIndex, 1);
              return updatedUsers;
            }
            // If the user is already in the array, update their cursor data
            const updatedUsers = [...prev];
            updatedUsers[userIndex] = data;
            return updatedUsers;
          }
        });
      }
    });

    // Remove the users cursor when the current user is offline or leaves the page
    socket.on("user_left", (data) => {
      setUsersCursor(prev => {
        const updatedUsers = prev.filter(user => user.user.userId !== data.userId);
        return updatedUsers;
      });
    });
  }
}, [socket, userInformation?.userId, usersCursor]);


  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);

  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (rect) {
  //     const scrollX = window.scrollX;
  //     const scrollY = window.scrollY;
  //     x.set(e.clientX - rect.left + scrollX);
  //     y.set(e.clientY - rect.top + scrollY);
  //     if(socket) {
  //       setTimeout(() => {
  //         socket.emit("cursor_changes",  {
  //           x: e.clientX - rect.left + scrollX,
  //           y: e.clientY - rect.top + scrollY,
  //           isInside: true
  //         });
  //       }, 150)
  //     }
  //   }
  // };
  const throttledMouseMove = throttle((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      x.set(e.clientX - rect.left + scrollX);
      y.set(e.clientY - rect.top + scrollY);
      if(socket) {
        socket.emit("cursor_changes", {
          x: e.clientX - rect.left + scrollX,
          y: e.clientY - rect.top + scrollY,
          isInside: true
        });
      }
    }
  }, 100); // Adjust the time interval as needed
  
  // Use throttledMouseMove instead of handleMouseMove in onMouseMove event handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    throttledMouseMove(e);
  };
  const handleMouseLeave = () => {
    if(socket) {
      socket.emit("cursor_changes",  {
          x: 0,
          y: 0,
          left: true
        });
    }
  };
  const handleMouseEnter = () => {
    if(socket) {
      socket.emit("cursor_changes",  {
          x: 0,
          y: 0,
          isInside: true
        });
    }
  };

  
  
  
  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {usersCursor.map((cursor, index) => (
         <FollowPointer role={role} key={cursor.user.userId} userId={cursor.user.userId} x={cursor.payload.x} y={cursor.payload.y} title={cursor.user.name} />
        ))}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
  role,
  userId
}: {
  x: any;
  y: any;
  title?: string | React.ReactNode;
  role: string,
  userId: string
}) => {
  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke="#fff"
        fill={`${generateColor(userId)}`}
        strokeWidth="1"
        viewBox="0 0 16 16"
        className={`h-6 w-6 text-[${generateColor(userId)}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-[${generateColor(userId)}]`}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
      <motion.div
        style={{
          backgroundColor: `${generateColor(userId)}`,
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className={
          "px-2 py-2 bg-neutral-200 text-white whitespace-nowrap min-w-max text-xs rounded-full"
        }
      >
        {role == "owner" ? `${title} (owner)` : title || `unknown user`}
      </motion.div>
    </motion.div>
  );
};
