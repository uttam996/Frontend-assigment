
import Component from "../Component/Component";
import { UseGetData } from "../Hooks/UseApiHooks";

import SampleSplitter from "./SampleSplitter";
import { cn } from "./SampleSplitter";
import { useResizable } from "react-resizable-layout";


export default function Home() {
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 250,
    min: 50,
    reverse: true,
  });
  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 250,
    min: 50,
  });
  const {
    isDragging: isPluginDragging,
    // position: pluginW,
  
  } = useResizable({
    axis: "x",
    initial: 200,
    min: 50,
    reverse: true,
  });

  
  

  const { data, isPending  } = UseGetData();

  console.log(data?.data)





  return (
    <div
      className={
        "flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"
      }
    >
      <div className={"flex grow"}>
        <div
          className={cn("shrink-0 contents", isFileDragging && "dragging")}
          style={{ width: fileW,
         
           }}
        >
          <Component 
           data = {data?.data?.find((item:any) => item?.componentName === "component1") || ""}
           name = "component1"
           isPending={isPending}
          />
        </div>
        <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div className={"flex grow"}>
          <div className={"grow bg-darker contents"}> 
          <Component 
           data = {data?.data?.find((item:any) => item?.componentName === "component2") || ""}
           name = "component2"
           isPending={isPending}
          />
          </div>
          <SampleSplitter
            isDragging={isPluginDragging}
          
          />
        
        </div>
      </div>
      <SampleSplitter
        dir={"horizontal"}
        isDragging={isTerminalDragging}
        {...terminalDragBarProps}
      />
      <div
        className={cn(
          "shrink-0 bg-darker contents",
          isTerminalDragging && "dragging"
        )}
        style={{ height: terminalH }}
      >
          <Component 
           data = {data?.data?.find((item:any) => item?.componentName === "component3") || ""}
           name = "component3"
           isPending={isPending}
          />
        
      </div>
    </div>
  );
}
