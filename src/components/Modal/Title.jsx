import { useState, useEffect } from "react";
import React from 'react';
import "../css/Title.css";
const Title = ({title="Not found",color="black"}) => {

    const [logoName,setLogoName] = useState('')

    useEffect(() => {
        let words = title.split(" ");
        let initials = '';
    
        if (words.length > 0) {
          initials += words[0][0];
        }
    
        if (words.length > 1) {
          initials += words[1][0];
        }
    
        setLogoName(initials.toUpperCase());
      }, [title]);

  return <div className="title-component">
    <div className="logo" style={{backgroundColor: color ? color : "#fff"}}>{logoName}</div>
    <div className="note-title">{title}</div>
  </div>;
};

export default Title;