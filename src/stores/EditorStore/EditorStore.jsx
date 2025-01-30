import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import useProjectStore from "../ProjectStore/ProjectStore";
import { patchData } from "@/Services/ApiClient/Services";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { toast } from "react-toastify";

const useEditorStore = create(
  persist(
    (set) => ({
      data: null,
      // id: null,
      // setId: (val) => {
      //   set((pre) => {
      //     if (pre.id !== val) {
      //       console.log("reset");
      //       pre.getData(val);
      //       return { ...pre, id: val };
      //     }
      //     return pre;
      //   });
      // },
      getData: (projectId) => {
        set((pre) => ({
          data: null,
        }));
        // useProjectStore.getState().updateProject(projectId);
        // console.log("store updated");
        set((pre) => {
          const state = useProjectStore.getState();
          state.updateProject(projectId);
          console.log("editor State EE: ", state);
          return {
            data: state.page,
          };
        });
      },
      saveData: (data, projectId) => {
        patchData(
          `/projects/${projectId}/`,
          { page: JSON.stringify(data) },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
          .then((res) => {
            console.log("finish", res);
            toast.success(<CustomToast Header="پروژه با موفقیت ذخیره شد" />);
            useProjectStore.getState().updateProject(projectId);
          })
          .catch((err) => {
            console.log(err);
            toast.error(<CustomToast Header="خطا در ذخیره پروژه" />);
          });
        set((pre) => ({ ...pre, data: data }));
      },
      deleteData: () => set((pre) => null),
    }),
    {
      name: "Editor-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useEditorStore;
