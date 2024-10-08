import React, { useState } from 'react';
import './styles.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

const FieldSelected = ({ data = [], setData }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const copyObject = () => {
    const textData = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(textData).then(() => {
      setCopyButtonText("Copied!");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 2000);
    });
  };

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
                        (sub) =>
                          (typeof sub === 'object' ? sub.name : sub) !==
                          submoduleName
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
          return null;
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const removeKeyFromHotel = (hotelId, key) => {
    const updatedData = data
      .map((hotel) => {
        if (hotel.hotelId === hotelId) {
          const { [key]: _, ...remainingKeys } = hotel;
          return remainingKeys;
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const removeKeyFromModule = (hotelId, moduleName, key) => {
    const updatedData = data
      .map((hotel) => {
        if (hotel.hotelId === hotelId) {
          return {
            ...hotel,
            modules: hotel.modules.map((mod) => {
              if (mod.name === moduleName) {
                const { [key]: _, ...remainingKeys } = mod;
                return remainingKeys;
              }
              return mod;
            }),
          };
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const removeKeyFromSubmodule = (hotelId, moduleName, submoduleName, key) => {
    const updatedData = data
      .map((hotel) => {
        if (hotel.hotelId === hotelId) {
          return {
            ...hotel,
            modules: hotel.modules.map((mod) => {
              if (mod.name === moduleName) {
                return {
                  ...mod,
                  submodules: mod.submodules.map((sub) => {
                    if (typeof sub === 'object' && sub.name === submoduleName) {
                      const { [key]: _, ...remainingKeys } = sub;
                      return {
                        ...remainingKeys,
                        name: sub.name,
                      };
                    }
                    return sub;
                  }),
                };
              }
              return mod;
            }),
          };
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const removeDetail = (hotelId, moduleName, submoduleName, detailIndex) => {
    const updatedData = data.map((hotel) => {
      if (hotel.hotelId === hotelId) {
        return {
          ...hotel,
          modules: hotel.modules.map((mod) => {
            if (mod.name === moduleName) {
              return {
                ...mod,
                submodules: mod.submodules.map((sub) => {
                  if (typeof sub === 'object' && sub.name === submoduleName) {
                    const updatedDetails = sub.details
                      ? sub.details.filter((_, index) => index !== detailIndex)
                      : [];
                    return {
                      ...sub,
                      details: updatedDetails,
                    };
                  }
                  return sub;
                }),
              };
            }
            return mod;
          }),
        };
      }
      return hotel;
    });

    setData(updatedData);
  };

  const handleCopy = () => {
    if (data.length === 0) {
      alert('Please add items to copy!');
      return;
    }

    const textData = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(textData).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => {
        setCopyButtonText('Copy');
      }, 2000);
    });
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="field-selected">
      <div className='headingAndBtn'>
      <h3>Selected Configuration
      </h3>
      <button onClick={copyObject} className="copyBtn">
                  {copyButtonText === "Copy" ? (
                    <ContentCopyIcon />
                  ) : (
                    <DoneIcon />
                  )}
                  {copyButtonText}
                </button>
                
      </div>
      <div className="selected-json">
        <pre className="selected-json-container">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      <ul>
        {data.map((hotel, hotelIndex) => (
          <li key={hotelIndex}>
            <div className="hotel-id-info">
              <div className="hotel-info">
                {`Hotel: ${hotel.name}, ID: ${hotel.hotelId}`}
                <button
                  className="remove-btn"
                  onClick={() => removeItem(hotel.hotelId)}
                >
                  <DeleteIcon style={{ fontSize: 18 }} />
                </button>
              </div>
              {Object.keys(hotel)
                .filter(
                  (key) =>
                    ![
                      'hotelId',
                      'name',
                      'modules',
                      'title',
                      'orderOfModules',
                    ].includes(key) && hotel[key] !== undefined
                )
                .map((key) => (
                  <div key={key} className="hotel-info">
                    {`${key}: ${hotel[key]}`}
                    <button
                      className="remove-btn"
                      onClick={() => removeKeyFromHotel(hotel.hotelId, key)}
                    >
                      <DeleteIcon style={{ fontSize: 18 }} />
                    </button>
                  </div>
                ))}
            </div>

            {hotel.modules &&
              hotel.modules.length > 0 &&
              hotel.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="hotel-sub-info">
                  <div className="module-info">
                    {`Module: ${module.name}`}
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(hotel.hotelId, module.name)}
                    >
                      <DeleteIcon style={{ fontSize: 18 }} />
                    </button>
                  </div>

                  {['isActive', 'isDisabled', 'isRequired'].map(
                    (key) =>
                      module[key] !== undefined && (
                        <div key={key} className="module-info">
                          {`${key}: ${module[key]}`}
                          <button
                            className="remove-btn"
                            onClick={() =>
                              removeKeyFromModule(
                                hotel.hotelId,
                                module.name,
                                key
                              )
                            }
                          >
                            <DeleteIcon style={{ fontSize: 18 }} />
                          </button>
                        </div>
                      )
                  )}

                  {Object.keys(module)
                    .filter(
                      (key) =>
                        key !== 'name' &&
                        key !== 'submodules' &&
                        !['isActive', 'isDisabled', 'isRequired'].includes(
                          key
                        ) &&
                        module[key] !== undefined
                    )
                    .map((key) => (
                      <div key={key} className="module-info">
                        {`${key}: ${module[key]}`}
                        <button
                          className="remove-btn"
                          onClick={() =>
                            removeKeyFromModule(hotel.hotelId, module.name, key)
                          }
                        >
                          <DeleteIcon style={{ fontSize: 18 }} />
                        </button>
                      </div>
                    ))}

                  {module.submodules && module.submodules.length > 0 && (
                    <div className="submodule-info">
                      {Array.from(
                        new Set(
                          module.submodules.map((sub) =>
                            typeof sub === 'object' ? sub.name : sub
                          )
                        )
                      ).map((submoduleName) => {
                        return (
                          <div key={submoduleName} className="submodule-info">
                            <div>
                              {`Submodule: ${submoduleName}`}
                              <button
                                className="remove-btn"
                                onClick={() =>
                                  removeItem(
                                    hotel.hotelId,
                                    module.name,
                                    submoduleName
                                  )
                                }
                              >
                                <DeleteIcon style={{ fontSize: 18 }} />
                              </button>
                            </div>

                            {module.submodules.map((sub) => {
                              if (
                                typeof sub === 'object' &&
                                sub.name === submoduleName
                              ) {
                                return (
                                  <div key={`sub-${submoduleName}`}>
                                    {Object.keys(sub)
                                      .filter(
                                        (key) =>
                                          key !== 'name' &&
                                          sub[key] !== undefined
                                      )
                                      .map((key) => (
                                        <div key={`${submoduleName}-${key}`}>
                                          {`${key}: ${sub[key]}`}
                                          <button
                                            className="remove-btn"
                                            onClick={() =>
                                              removeKeyFromSubmodule(
                                                hotel.hotelId,
                                                module.name,
                                                submoduleName,
                                                key
                                              )
                                            }
                                          >
                                            <DeleteIcon
                                              style={{ fontSize: 18 }}
                                            />
                                          </button>
                                        </div>
                                      ))}

                                    {sub.details &&
                                      Array.isArray(sub.details) && (
                                        <div className="submodule-info">
                                          {sub.details.map(
                                            (detail, detailIndex) => (
                                              <div
                                                key={`${submoduleName}-detail-${detailIndex}`}
                                              >
                                                {Object.keys(detail).map(
                                                  (key, idx) => (
                                                    <div
                                                      key={`${submoduleName}-detail-${detailIndex}-${idx}`}
                                                    >
                                                      {`${key}: ${detail[key]}`}
                                                    </div>
                                                  )
                                                )}
                                                <button
                                                  className="remove-btn"
                                                  onClick={() =>
                                                    removeDetail(
                                                      hotel.hotelId,
                                                      module.name,
                                                      submoduleName,
                                                      detailIndex
                                                    )
                                                  }
                                                >
                                                  <DeleteIcon
                                                    style={{ fontSize: 18 }}
                                                  />
                                                </button>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default FieldSelected;
