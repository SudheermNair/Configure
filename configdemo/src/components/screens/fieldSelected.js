
import React from 'react';
import './styles.scss';
import DeleteIcon from '@mui/icons-material/Delete';

const FieldSelected = ({ data = [], setData }) => {
  const removeItem = (hotelId, moduleName, submoduleName) => {
    const updatedData = data
      .map((hotel) => {
        if (hotel.hotelId === hotelId) {
          if (moduleName) {
            if (submoduleName) {
              return {
                ...hotel,
                modules: hotel.modules.map((mod) => {
                  if (mod.name === moduleName) {
                    return {
                      ...mod,
                      submodules: mod.submodules.filter(
                        (sub) => sub.name !== submoduleName
                      ),
                    };
                  }
                  return mod;
                }),
              };
            } else {
              return {
                ...hotel,
                modules: hotel.modules.filter((mod) => mod.name !== moduleName),
              };
            }
          }
          return hotel;
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const removeKey = (hotelId, key) => {
    const updatedData = data
      .map((hotel) => {
        if (hotel.hotelId === hotelId) {
          const { [key]: _, ...remainingKeys } = hotel;
          return {
            ...remainingKeys,
            hotelId: hotel.hotelId,
            name: hotel.name,
            modules: hotel.modules,
          };
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const handleSubmit = () => {
    if (data.length === 0) {
      alert('Please add items to submit!');
    } else {
      alert('Submitted!');
    }
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="field-selected">
      <h1>Selected Configuration</h1>
      <pre className="selected-json-container">
        {JSON.stringify(data, null, 2)}
      </pre>
      <ul>
        {data.map((hotel) => (
          <li key={hotel.hotelId}>
            <div>
              {`Hotel: ${hotel.name}, ID: ${hotel.hotelId}`}
              <button
                className="remove-btn"
                onClick={() => removeItem(hotel.hotelId)}
              >
                <DeleteIcon style={{ fontSize: 18 }} />
              </button>
            </div>
            {hotel.modules.map((module) => (
              <div key={module.name}>
                <span>{`Module: ${module.name}`}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(hotel.hotelId, module.name)}
                >
                  <DeleteIcon style={{ fontSize: 18 }} />
                </button>
                {module.submodules.map((submodule) => (
                  <div key={submodule.name}>
                    <span>{`Submodule: ${submodule.name}`}</span>
                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(hotel.hotelId, module.name, submodule.name)
                      }
                    >
                      <DeleteIcon style={{ fontSize: 18 }} />
                    </button>
                    {/* Display key-value pairs for submodules */}
                    {Object.entries(submodule).map(([key, value]) => {
                      if (key !== 'name' && value !== undefined) {
                        return (
                          <div key={key}>
                            {`${key}: ${value}`}
                            <button
                              className="remove-btn"
                              onClick={() => removeKey(hotel.hotelId, key)}
                            >
                              <DeleteIcon style={{ fontSize: 18 }} />
                            </button>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
                {/* Display key-value pairs for modules */}
                {Object.entries(module).map(([key, value]) => {
                  if (key !== 'name' && key !== 'submodules' && value !== undefined) {
                    return (
                      <div key={key}>
                        {`${key}: ${value}`}
                        <button
                          className="remove-btn"
                          onClick={() => removeKey(hotel.hotelId, key)}
                        >
                          <DeleteIcon style={{ fontSize: 18 }} />
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
            {/* Display key-value pairs at hotel level */}
            {Object.entries(hotel)
              .filter(([key, value]) => !['hotelId', 'name', 'modules'].includes(key) && value !== undefined)
              .map(([key, value]) => (
                <div key={key}>
                  {`${key}: ${value}`}
                  <button
                    className="remove-btn"
                    onClick={() => removeKey(hotel.hotelId, key)}
                  >
                    <DeleteIcon style={{ fontSize: 18 }} />
                  </button>
                </div>
              ))}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FieldSelected;
