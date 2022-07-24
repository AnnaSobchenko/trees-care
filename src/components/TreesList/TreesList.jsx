import s from "./TreesList.module.scss";
import img from "../../images/favicon.png";
import Modal from "../../components/Modal/Modal";
import CardTree from "../../components/CardTree/CardTree";

import React, { useEffect, useState } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";

import { getAllTrees } from "../../redux/trees/treesOperations";
import { useDispatch, useSelector } from "react-redux";
import { getTrees } from "../../redux/trees/treesSelector";
import TreeForm from "../TreeForm/TreeForm";

const TreesList = () => {
  const [anchor, setAnchor] = useState([49.23435015414822, 28.458172138820828]);
  const [payload, setPayload] = useState("ergrytuyjtrr");
  // const [showInfo, setShowInfo] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [addTree, setAddTree] = useState(false);
  // const [modalInfo, setModalInfo] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const dispatch = useDispatch();
  const allTrees = useSelector(getTrees);

  const mapClick = (e) => {
    setAnchor(e.latLng);
    console.log("e.latLng :>> ", e.latLng);
    setShowBtn(false);
  };

  const test = ({ event, anchor, payload }) => {
    console.log({ event, anchor, payload });

    setShowBtn(true);
  };

  const [modal, setModal] = useState({
    open: false,
    content: null,
  });

  const openModal = (content) => {
    setModal({
      open: true,
      content,
    });
  };

  const closeModal = () => {
    setShowTree(false);
    setAddTree(false);
    setModal({
      open: false,
      content: null,
    });
  };
  const handleOpenModal = (data) => {
    // const email = e.currentTarget.id;

    openModal(data);
  };

  const showTreeModal = (data) => {
    handleOpenModal(data);
    setShowTree(true);
  };

  const addTreeModal = (data) => {
    handleOpenModal(data);
    setAddTree(true);
  };

  useEffect(() => {
    dispatch(getAllTrees());
  }, []);

  return (
    <section className={s.treesSection}>
      <Map
        defaultCenter={[49.23435015414822, 28.458172138820828]}
        defaultZoom={11}
        onClick={mapClick}
      >
        <Marker
          width={30}
          anchor={anchor}
          color="red"
          payload={payload}
          onClick={({ event, anchor, payload }) =>
            test({ event, anchor, payload })
          }
        />

        {allTrees.map((data) => {
          const {
            age,
            condition,
            image,
            kindOfTree,
            location,
            necessaryWorks,
            radius,
            registrationNumber,
          } = data;
          return (
            <Marker
              width={radius}
              anchor={[location.lat, location.lng]}
              // value={}
              color="green"
              key={registrationNumber}
              onClick={() => showTreeModal(data)}
            />
          );
        })}
        {modal.open && showTree && (
          <Modal handleClose={closeModal} checker={true}>
            <CardTree contact={modal.content} closeModal={closeModal} />
          </Modal>
        )}
        {modal.open && addTree && (
          <Modal handleClose={closeModal} checker={true}>
            <TreeForm contact={modal.content} closeModal={closeModal} />
          </Modal>
        )}
      </Map>
      {showBtn && (
        <button className={s.addBtn} onClick={(data) => addTreeModal(data)}>
          Додати дерево
        </button>
      )}
    </section>
  );
};

export default TreesList;
