import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "./ModelComponent.module.scss";

export const ModelComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({ mode: "onChange" });
  const { fields, append } = useFieldArray({
    control,
    name: "properties",
  });
  const dataTypes = [
    "",
    "char",
    "int",
    "boolean",
    "float",
    "double",
    "short",
    "long",
    "byte",
  ];
  return (
    <div className={styles.model}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <label className={styles.modelName}>Model name</label>
        <input
          {...register("name", {
            required: "This is required",
            minLength: {
              value: 5,
              message: "This should be minimum 5 characters",
            },
          })}
          type="text"
          placeholder="model name"
          required
        />
        <p className={styles.error}>{errors.name?.message}</p>
        <br />
        <h5>Properties</h5>
        <div>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className={styles.field}>
                <label>Type</label>
                <select
                  name="dataType"
                  {...register(`properties.${index}.dataType`, {
                    required: "This field is mandatory",
                  })}
                >
                  {dataTypes.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
                <br />
                <label>Name</label>
                <input
                  type="text"
                  name="typeName"
                  {...register(`properties.${index}.typeName`, {
                    required: "This field is mandatory",
                    minLength: {
                      value: 5,
                      message: "This should be minimum 5 characters",
                    },
                  })}
                />
                {/* <p className={styles.error}>
                  {errors.properties[index].typeName?.message}
                </p> */}
              </div>
            );
          })}
        </div>
        <br />
        <button
          onClick={() => append({ name: "append" })}
          className={`${styles.button} ${styles.light}`}
        >
          Append
        </button>
        <br />
        <button
          type="submit"
          disabled={!isValid}
          className={`${styles.button} ${styles.regular}`}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};
