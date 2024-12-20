import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const TransactionTags = ({ tags, selectedTags, toggleTag }: { tags: { name: string, color: string }[], selectedTags: string[], toggleTag: (name: string) => void }) => {
  const RenderTag = ({ item }: { item: { name: string; color: string } }) => {
    const isSelected = selectedTags.includes(item.name);
    return (
      <TouchableOpacity
        onPress={() => toggleTag(item.name)}
        className={`p-2 rounded-lg my-2 mx-[2px] border-[${item.color}] border-2 flex-row`}
        style={{
          backgroundColor: isSelected ? item.color : '#161622',
          borderColor: item.color,
        }}
      >
        <Text
          className={`font-semibold text-[12px] ${!isSelected ? 'text-white' : 'text-black'}`}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className='flex-row flex-wrap'>
      {
        tags.map((item, index) => {
          return <RenderTag item={item} key={index} />
        })
      }
    </View>
  )
  // return (
  //   <FlatList
  //     // horizontal
  //     scrollEnabled={false}
  //     data={tags}
  //     className='flex-row'
  //     contentContainerStyle={{flexDirection:"row", flexWrap:"wrap"}}
  //     renderItem={RenderTag}
  //     keyExtractor={(item, index) => index.toString()}
  //   />
  // );
};

export default TransactionTags;
