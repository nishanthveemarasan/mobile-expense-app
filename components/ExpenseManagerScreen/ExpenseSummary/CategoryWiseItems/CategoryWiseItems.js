import { FlatList, View } from "react-native";
import CategoryWiseItem from "./CategoryWiseItem";

const CategoryWiseItems = ({ data, balance, income }) => {
  return (
    <>
      {Object.keys(data.category).map((el, i) => {
        return (
          <View key={el}>
            <CategoryWiseItem
              category={el}
              data={data.category}
              balance={balance}
              income={income}
            />
          </View>
        );
      })}
    </>
  );
};

export default CategoryWiseItems;
