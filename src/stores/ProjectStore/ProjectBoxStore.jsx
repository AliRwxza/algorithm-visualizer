import { getData } from "@/Services/ApiClient/Services";
import { create } from "zustand";

const useProjectBoxStore = create((set) => ({
  projects: [],
  Loading: false,

  // Setter for the projects array
  setProjects: (projects) => set((pre) => ({ ...pre, projects })),

  // Setter for the loading state
  setLoading: (state) => set((pre) => ({ ...pre, Loading: state })),

  // Function to update projects
  updateProjects: async (username) => {
    // Start loading
    set({ Loading: true });

    try {
      // Fetch data asynchronously
      const data = await getData(`/startup/projects/${username}/`);
      // Set projects data
      set({ projects: data });
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      // Stop loading
      set({ Loading: false });
    }
  },
}));

export default useProjectBoxStore;
