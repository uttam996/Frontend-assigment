import { Box, Stack, TextareaAutosize } from '@mui/material'
import React from 'react'

export default function Component() {
  return (
    <Box>
      <textarea
        className="w-full h-full bg-dark color-white font-mono"
        placeholder="Type your code here..."
      ></textarea>

      <Stack spacing={2} direction="row" className="flex justify-end">
        <button className="btn">Add</button>
        <button className="btn">Format</button>
      </Stack>



    </Box>
  )
}
