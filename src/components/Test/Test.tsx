"use client";
import React from 'react';

import classes from './Test.module.css';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {testThunk} from "@/redux/features/todo-slice";

interface ITestProps {
}

const Test: React.FC<ITestProps> = () => {

  const dispatch = useDispatch<AppDispatch>();

  const onClick = ()=> {
    dispatch(testThunk())
  }

  return (
    <div>
      <button className={classes.container} onClick={onClick}>
        {'Test'}
      </button>
    </div>
  )
};

export default Test;