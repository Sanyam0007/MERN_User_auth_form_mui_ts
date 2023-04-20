import { Card } from '@material-ui/core'
import { CardContent, Typography } from '@mui/material'
import React from 'react'

export const About = () => {
  return (
    <div>
      <Card style={{background:'transparent',height:'550px'}}>
        <CardContent>
          <Typography variant='h5' style={{color:'white'}}>
          This is an about page
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
