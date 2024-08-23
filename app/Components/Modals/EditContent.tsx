"use client"
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalProvider';
import Button from '../Button/Button';
import {add } from '@/app/utils/Icons';

interface Props{
    title1: string;
    status1: string;
    date1: string;
    id1: string;
    closeModal: ()=>void;
  }

function EditContent({title1, status1, date1, id1, closeModal }: Props) {
    const[title, setTitle] = useState(title1);
    const [date, setDate] = useState(date1);
    const [status, setStatus] = useState(status1);

    const {theme, getApplications,} = useGlobalState();

    const handleChange = (name: string) => (e: any) => {
        switch (name) {
          case "title":
            setTitle(e.target.value);
            break;
          case "date":
            setDate(e.target.value);
            break;
          case "status":
            setStatus(e.target.value);
            break;
          default:
            break;
        }
      };
    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        const application = {title, status, date};
        try{
            const response = await axios.put(`/api/applications/${id1}`,application);
            if(response.data.error){
                toast.error(response.data.error);
            }
            getApplications();
            closeModal();
            toast.success("Success");
        }catch(error){
            toast.error(" :/ Something went wrong");
            console.log(error);
        }
    };
  return (
    <EditModalStyle theme ={theme}>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal-content">
            <EditContentStyle onSubmit = {handleSubmit} theme={theme}>
                <h1>Create an Application Tracker</h1>
                <div className="input-control">
                    <label htmlFor="title">Company Name</label>
                    <input type="text" id="title" value={title} name="title" onChange={handleChange("title")} placeholder="Title"/>
                </div>
                <div className="input-control">
                    <label htmlFor="status">Status</label>
                    <select
                    id="status"
                    value={status}
                    name="status"
                    onChange={handleChange("status")}
                    >
                    <option value="started application">Started Application</option>
                    <option value="submitted application">Submitted Application</option>
                    <option value="interview">Interview</option>
                    </select>
                </div>
                <div className="input-control">
                    <label htmlFor="date">Date</label>
                    <input
                    value={date}
                    onChange={handleChange("date")}
                    type="date"
                    name="date"
                    id="date"
                    />
                </div>
                <div className="submit-btn flex justify-end">
                    <Button
                    type="submit"
                    name="Edit Task"
                    icon={add}
                    padding={"0.8rem 2rem"}
                    borderRad={"0.8rem"}
                    fw={"500"}
                    fs={"1.2rem"}
                    background={theme.colorGreenDark}
                    />
                </div>
            </EditContentStyle>
        </div>
    </EditModalStyle>
  )
}

const EditContentStyle = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea,
    select {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

const EditModalStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;

    .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
    }

    .modal-content {
        margin: 0 1rem;

        padding: 2rem;
        position: relative;
        max-width: 630px;
        width: 100%;
        z-index: 100;

        border-radius: 1rem;
        background-color: ${(props) => props.theme.colorBg2};
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
        border-radius: ${(props) => props.theme.borderRadiusMd2};

        @media screen and (max-width: 450px) {
            font-size: 90%;
        }
    }
`;


export default EditContent