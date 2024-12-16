import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchUsersCount } from "../services";

  
  export const useUsers = (pageNumber: number, pageSize: number) => {
    return useQuery({
      queryKey: ["users", pageNumber, pageSize], 
      queryFn: () => fetchUsers(pageNumber, pageSize),
      placeholderData: keepPreviousData,
    });
  };

  export const useUsersCount = () => {
    return useQuery({
      queryKey: ["usersCount"], 
      queryFn: () => fetchUsersCount(),
    });
  };
