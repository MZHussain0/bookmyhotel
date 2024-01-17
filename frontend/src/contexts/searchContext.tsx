import { createContext, useContext, useState } from "react";

type SearchContextType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId?: string | undefined;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [searchValues, setSearchValues] = useState<SearchContextType>({
    destination: "",
    checkIn: new Date(),
    checkOut: new Date(),
    adultCount: 1,
    childCount: 0,
    hotelId: "",
    saveSearchValues: (
      destination: string,
      checkIn: Date,
      checkOut: Date,
      adultCount: number,
      childCount: number,
      hotelId?: string
    ) => {
      setSearchValues({
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId: hotelId || "",
        saveSearchValues: searchValues.saveSearchValues,
      });
    },
  });

  return (
    <SearchContext.Provider value={searchValues}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchContext");
  }
  return context;
};
