import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setUpdated }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  
 
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
        .put("/colors/" + colorToEdit.id, colorToEdit)
        .then(res => {
            const newColor = colors.map(c => {
              // console.log("EDIT COLOR:", c.id, colorToEdit.id);
              if (c.id === colorToEdit) {
                return (c = colorToEdit)
              }
              else {
                return c;
              }
            })
            updateColors(newColor);
            setEditing(false);
            setColorToEdit(initialColor);
          })
        .catch(err => console.log(err))
    
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete("/colors/" + color.id)
    .then(res => {
      console.log("DELETE COLOR:", colors, color.id);
      const newColor = colors.filter(c => {
        if (c.id !== color.id) {
          console.log("FIND COLOR:", c.id, color.id);
          return c
        }
      })
      updateColors(newColor);

    })
    .catch(err => console.log(err) )
  };

 
  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors/", colorToEdit)
      .then(res => {
        const newColor = [...colors, colorToEdit];
        updateColors(newColor);
        setColorToEdit(initialColor);
      })
      .catch(err => console.log(err));
  }

  const undoEdit = () => {
    setEditing(false);
    setColorToEdit(initialColor);
  }


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>
              <span onClick={() => editColor(color)}>
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      
        <form onSubmit={editing ? saveEdit : addColor}>
          <legend>{editing ? "edit color" : "Add Color"}</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
          {editing ? (
            <>
              <button type="submit">Edit</button>
              <button onClick={() => undoEdit}>cancel</button>
            </>
          ) : (
            <button type="submit">Add</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ColorList;


