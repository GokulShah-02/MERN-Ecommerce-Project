import React, {Fragment} from "react";
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel'
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

function CheckoutStep({activeStep}) {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "tomato",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "tomato",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  return (
    <Fragment>
      <Box sx={{ width: '100%', marginBottom: "5vh"}}>
        <Stepper activeStep={activeStep} alternativeLabel style={stepStyles} connector={<QontoConnector />}>
          {steps.map((item, index) => (
            <Step key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                icon={item.icon}
                style={{
                  color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)"
                }}
              >
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Fragment>
  );
}

export default CheckoutStep;
