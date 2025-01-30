import { getData } from "@/Services/ApiClient/Services";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const usePublicProjectStore = create(
  persist(
    (set) => ({
      image: "",
      name: "",
      owner: "",
      likes: 0,
      description: "",
      profile: "",
      ownerName: "",
      position: null,
      loading: false,
      isLiked: false,
      isBookmarked: false,
      subcategories: [],
      totalFunded: 0,
      setProjectId: (val) => set((pre) => ({ ...pre, projectId: val })),
      setImage: (val) => set((pre) => ({ ...pre, image: val })),
      setName: (val) => set((pre) => ({ ...pre, name: val })),
      setOwner: (val) => set((pre) => ({ ...pre, owner: val })),
      setDescription: (val) => set((pre) => ({ ...pre, description: val })),
      setProfile: (val) => set((pre) => ({ ...pre, profile: val })),
      setOwnerName: (val) => set((pre) => ({ ...pre, ownerName: val })),
      setPosition: (val) => set((pre) => ({ ...pre, position: val })),
      setLoading: (val) => set((pre) => ({ ...pre, loading: val })),
      setSubcategories: (val) => set((pre) => ({ ...pre, subcategories: val })),
      setTotalFunded: (val) => set((pre) => ({ ...pre, totalFunded: val })),
      setLikes: (val) => set((pre) => ({ ...pre, likes: val })),
      setIsLiked: (val) => set((pre) => ({ ...pre, isLiked: val })),
      setIsBookmarked: (val) => set((pre) => ({ ...pre, isBookmarked: val })),
      updatePublicProject: async (projectId) => {
        set((pre) => ({ ...pre, loading: true }));
        try {
          let data = await getData(`/projects/detail/${projectId}/`);
          console.log(data)
          set((pre) => ({
            ...pre,
            image: data.image,
            name: data.name,
            isLiked: data.is_liked,
            isBookmarked: data.is_bookmarked,
            owner: data.owner_username,
            description: data.description,
            subcategories: data.subcategories,
            position: data.open_position,
            profile: data.owner_profile_picture,
            likes: data.like_count
          }));
          data = await getData(`/invest/history/project/${projectId}/amount/`);
          set((pre) => {
            let total = 0;
            data.forEach((element) => {
              total += Number(element.investment_amount);
            });
            return {
              ...pre,
              totalFunded: total,
            };
          });
          set((pre) => ({ ...pre, loading: false }));
        } catch (err) {
          console.log("fail to get public");
          set((pre) => ({ ...pre, loading: false }));
        }
      },
      getLog: () =>
        set((pre) => {
          console.log("publicProject: ", pre);
          return { ...pre };
        }),
    }),
    {
      name: "publicProject-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default usePublicProjectStore;
