"use client";
import React from 'react'
import {edit} from "@/app/utils/Icons";
import {trash} from '@/app/utils/Icons';
import styled from "styled-components";
import { useGlobalState } from '@/app/context/globalProvider';
import formatDate from "@/app/utils/formatDate";
import EditContent from '../Modals/EditContent';
import { useState } from 'react';
interface Props{
  title: string;
  status: string;
  date: string;
  isCompleted: number;
  id: string;
}

function ApplicationItem({title, status, date, isCompleted, id }: Props) {
    const{theme, deleteApps, updateApps,} = useGlobalState();
    const [editModal, setEditModal] = useState(false);
    const openEditModal = () => {
        setEditModal(true);
      };
    
      const closeEditModal = () => {
        setEditModal(false);
      };
  return (
    <ApplicationItemStyle theme = {theme}> 
        {editModal && (
        <EditContent
          title1={title}
          status1={status}
          date1={date}
          id1={id}
          closeModal={closeEditModal} // Pass down close function to close the modal
        />
      )}
        <h1>{title}</h1>
        <p>Status: {status}</p>
        <p className="date">Started on: {formatDate(date)}</p>
        <div className="application-footer">
        {isCompleted === 0 && (
          <button
            className="ongoing"
            onClick={(e) => {
              const app = {
                id,
                isCompleted,
              };

              updateApps(app,e);
            }}
          >
            Ongoing
          </button>
        )} 
        {isCompleted === 1 && (
          <button
            className="offer"
            onClick={(e) => {
              const app = {
                id,
                isCompleted,
              };

              updateApps(app,e);
            }}
          >
            Offer
          </button>
        )} 
        {isCompleted === 2 && (
          <button
            className="rejected"
            onClick={(e) => {
              const app = {
                id,
                isCompleted,
              };

              updateApps(app,e);
            }}
          >
            Rejected
          </button>
        )} 
            <button className="edit" onClick = {openEditModal}>
                {edit}
            </button>
            <button className="delete" onClick={()=>{deleteApps(id)}}>{trash}</button>
        </div>
    </ApplicationItemStyle>
  )
}

const ApplicationItemStyle = styled.div`
  margin: 2rem 0;
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .application-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .offer,
    .ongoing,
    .rejected {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .offer{
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
    .ongoing{
      background: ${(props) => props.theme.colorOngoing};
    }
  }
`;


export default ApplicationItem