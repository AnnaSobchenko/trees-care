import React, { useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { onPhoneFormReset } from "../../redux/user/userSlice";
import s from "./TreeForm.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getTheme } from "../../redux/theme/themeSelector";
import FormikSelect from "../_shared/LabelForm/FormikSelect";
import { addTree } from "../../redux/trees/treesOperations";
import { TreeValidationSchema } from "../../utils/validation/TreeValid";
import LabelForm from "../_shared/LabelForm/LabelForm";
import FormikInput from "../_shared/LabelForm/FormikInput";

const TreeForm = ({ contact, closeModal }) => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  const kindOfTree = [
    {
      options: [
        { label: "Дуб", value: "oak" },
        { label: "Береза", value: "birch" },
        { label: "Абрикос", value: "apricot" },
        { label: "Іва", value: "willow" },
        { label: "Каштан", value: "chestnut" },
        { label: "Липа", value: "linden" },
        { label: "Платан", value: "sycamore" },
        { label: "Осина", value: "aspen" },
      ],
    },
  ];
  const age = [
    {
      options: [
        { label: "1-3 ", value: "1-3" },
        { label: "4-10 ", value: "4-10" },
        { label: "11-20", value: "11-20" },
        { label: "21-30", value: "21-30" },
        { label: "31-40", value: "31-40" },
        { label: "41-50", value: "41-50" },
        { label: "51-100", value: "51-100" },
      ],
    },
  ];
  const radius = [
    {
      options: [
        // { label: "<1 ", value: "<1" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
      ],
    },
  ];
  const location = contact;
  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={{
          radius: "",
          age: "",
          kindOfTree: "other",
          necessaryWorks: [],
          image: "tree.jpg",
          location: { lat: 49.23435015414822, lng: 28.458172138820828 },
        }}
        // validationSchema={TreeValidationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addTree({ form: { ...values, location }, method: "add" }));
          resetForm();
          closeModal(true);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className={s.authForm}>
            <h2 className={s.authFormTitle2}>Паспорт нового дерева</h2>
            <form onSubmit={handleSubmit} className={s.authFormInput}>
              <label className={s.label}>
                Радіус
                {/* <Field
                  name="radius"
                  component={FormikSelect}
                  value={values.radius}
                  onChange={handleChange}
                  options={radius}
                /> 
                 <ErrorMessage
                  component="div"
                  name="radius"
                  className={s.errorMessage}
                />*/}
                <FormikInput
                  type="radius"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                />
              </label>

              <label className={s.label}>
                Кількість років
                {/* <Field
                  name="treeOld"
                  component={FormikSelect}
                  value={values.treeOld}
                  onChange={handleChange}
                  options={treeOlds}
                />
                <ErrorMessage
                  component="div"
                  name="treeOld"
                  className={s.errorMessage}
                /> */}
                <FormikInput
                  type="age"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                />
              </label>

              <label className={s.label}>
                Вид дерева
                <Field
                  name="kindOfTree"
                  component={FormikSelect}
                  value={values.kindOfTree}
                  onChange={handleChange}
                  options={kindOfTree}
                />
                <ErrorMessage
                  component="div"
                  name="kindOfTree"
                  className={s.errorMessage}
                />
              </label>

              <div role="group" aria-labeledby="checkbox-group">
                <div>
                  <label className={s.label_checkbox}>
                    <Field
                      type="checkbox"
                      name="necessaryWorks"
                      value="resize:true"
                    />
                    Чи неохідно обрізати
                    {/* <ErrorMessage
                      component="div"
                      value="resize"
                      className={s.errorMessage}
                    /> */}
                  </label>
                </div>
                <div>
                  <label className={s.label_checkbox}>
                    <Field type="checkbox" name="necessaryWorks" value="cut" />
                    "Необхідно підстригти крону"
                    {/* <ErrorMessage
                      component="div"
                      value="cut"
                      className={s.errorMessage}
                    /> */}
                  </label>
                </div>
                <div>
                  <label className={s.lalabel_checkboxbel}>
                    <Field
                      type="checkbox"
                      name="necessaryWorks"
                      value="colorize"
                    />
                    "Необхідно кольорувати"
                    {/* <ErrorMessage
                      component="div"
                      value="colorize"
                      className={s.errorMessage}
                    /> */}
                  </label>
                </div>
                <div>
                  <label className={s.label_checkbox}>
                    <Field
                      type="checkbox"
                      name="necessaryWorks"
                      value="cut_off"
                    />
                    "Необхідно зрізати"
                    {/* <ErrorMessage
                      component="div"
                      value="cut off"
                      className={s.errorMessage}
                    /> */}
                  </label>
                </div>
                <div>
                  <label className={s.label_checkbox}>
                    <Field
                      type="checkbox"
                      name="necessaryWorks"
                      value="change"
                    />
                    "Необхідно замінити на нове"
                    {/* <ErrorMessage
                      component="div"
                      value="change"
                      className={s.errorMessage}
                    /> */}
                  </label>
                </div>
              </div>
              <label for="image" className={s.label}>
                Добавити фото дерева:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"
              ></input>
              <button
                type="submit"
                className={s.btn}
                onClick={() => {
                  toast.success(
                    "Thanks, the information has been sent to the administrator for approval",
                    { containerId: "B" }
                  );
                }}
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Додати
              </button>
              <button
                type="button"
                onClick={() => {
                  closeModal(true);
                }}
                className={s.btn}
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default TreeForm;
