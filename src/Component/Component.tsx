import { Box, Stack, colors } from "@mui/material";
import React, { useEffect } from "react";
import { UseAddData, UseUpdateData } from "../Hooks/UseApiHooks";
import { toast } from "react-toastify";

export default function Component({ data, name }: any) {
  const [value, setValue] = React.useState(data?.data);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(false);

  const { mutateAsync ,isPending} = UseAddData();
  const { mutateAsync: updateData,isPending:updateLoading } = UseUpdateData();

  useEffect(() => {
    setValue(data?.data);
  }, [data]);

  const handleAdd = async () => {
    try {
      await mutateAsync({
        componentName: name,
        data: value,
      });

      toast.success("Data added successfully");

    
      setIsAdd(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateData({
        componentName: name,
        data: value,
        componentId: data?._id,

      });

      toast.success("Data updated successfully");
      setIsEdit(false);
    } catch (error: any) {
      console.log(error);
      toast.success(error?.response?.data?.msg || "Something went wrong");
      
    }
  };

 
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack spacing={2} p={2} direction="row">
        <button
          onClick={() => {
            setValue("");
            setIsAdd(true);
            setIsEdit(false);
          }}
          className="btn"
        >
          Add
        </button>
        <button
          className="btn"
          onClick={() => {
            setValue(data?.data);

            setIsEdit(true);
            setIsAdd(false);
          }}
        >
          update
        </button>
      </Stack>

      <textarea
        style={{ width: "90%", height: "50%", margin: "10px" }}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your code here..."
        className="textArea"
        value={value}
        disabled={!isAdd && !isEdit}
      >
        {value}
      </textarea>
      <Stack spacing={2} p={2} direction="row">
      {isAdd && (
        isPending ? <button className="btn">Loading...</button> :
        <button 
        style={{
          backgroundColor: isPending ? "gray" : colors.green[500],
          cursor: isPending ? "not-allowed" : "pointer",
          border: "none",
          color: "white",
          padding: "10px 30px",

         }}
        onClick={handleAdd} className="btn">
          ADD
        </button>
      )}
      {isEdit && (
        updateLoading ? <button className="btn">Loading...</button> :
        <button 
         style={{
          backgroundColor: updateLoading ? "gray" : colors.green[500],
          cursor: updateLoading ? "not-allowed" : "pointer",
          border: "none",
          color: "white",
          padding: "10px 30px",
          textTransform: "uppercase",

         }}
        onClick={handleUpdate} className="btn">
          UPDATE
        </button>
      )}
      {(isAdd || isEdit) && (
        <button
          onClick={() => {
            setValue(data?.data);
            setIsEdit(false);
            setIsAdd(false);
          }}
          className="btn"
          style={{
            backgroundColor: colors.red[400],
            cursor: "pointer",
            border: "none",
            color: "white",
            padding: "10px 30px",
            textTransform: "uppercase",

          
          }}
        >
          cancel
        </button>
      )}
      </Stack>
    </Box>
  );
}
