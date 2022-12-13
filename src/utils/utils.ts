
import { iteratorSymbol } from "immer/dist/internal";
import { PartModel, ItemModel, TCTagModel} from "../models/models";



// make BOW from parts in items (keyA - ключ по которому мы делаем подсчет)
// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
// https://stackoverflow.com/questions/47847561/typescript-type-for-object-with-unknown-keys-but-only-numeric-values
// https://www.digitalocean.com/community/tutorials/how-to-use-generics-in-typescript

export const CalcPartsWithCnts = <T>(data: T[], keyA: string) => { 
  // resulting object
  let obj: {[key: string]: number} = {};

  // initial fill of object with keyA and counts
  for (let i=0; i < data.length; i++) {
    let tmp = data[i][keyA as keyof T]; //part;
    let tmpstr = tmp as string;
    if (obj.hasOwnProperty(tmp as string)) {
      obj[tmpstr] += 1;
    } else {
      obj[tmpstr] = 1;
    }
  }

  // convert object to array
  let partsArray: PartModel[] = [];
  for (let elem in obj) {
    //console.log(elem, obj[elem]);
    let pm: PartModel = {part: elem, cnt: obj[elem]};
    partsArray.push(pm);
    //partsArray.push({[keyA]: elem, cnt: obj[elem]}); // part
  }

  // sorting
  partsArray.sort(function(a: PartModel, b: PartModel) {
    if (a.part.toLowerCase() < b.part.toLowerCase()) {return -1}
    if (a.part.toLowerCase() > b.part.toLowerCase()) {return 1}
    
    return 0
  })

  return partsArray;
}

// ---------------------------------------------
//
export const AddLink = (data: ItemModel[], prefix: string): ItemModel[] => {
  return data.map( (item) => {
    return {...item, prodLink: `${prefix}${item.id}`}
  });
}


// ---------------------------------------------
// supp.function - дополняем пустые ключи к r1
export const suppFindKeyInActivArr = (name: string, r1: any, keyA: string) => {
  for (let i=0; i < r1.length; i++) {
    if (r1[i][keyA] === name) {
      return {found: true, index: i};
    }
  }
  return {found: false, index: null};
}


// dividing to pages -------------------------------------------
export const calcNumOfPages = <T>(array: T[], cntItemsInPart: number) => {
  return Math.ceil(array.length / cntItemsInPart);
}

export const DivideArrayOnParts = <T>(array: T[], cntItemsInPart: number, numOfPages: number) => {
  let arrSliced: T[][] = [];
  for (let i=0; i < numOfPages; i++) {
    let tmpBlock: T[] = array.slice(i*cntItemsInPart, i*cntItemsInPart + cntItemsInPart);
    arrSliced.push(tmpBlock)
  }
  //console.log('arrSliced=', arrSliced)
  return arrSliced;
}


export const TCTag_checkTagIdInTagList = (tagList: TCTagModel[], tag: TCTagModel): boolean => {
  for (let i=0; i < tagList.length; i++) {
    if (tagList[i].id === tag.id) {
      return true;
    }
  }
  return false;
}

export const IfOneTagExistsInItem = (oneItem: ItemModel, tags: TCTagModel[]): boolean => {
  for (let i=0; i < oneItem.tags_list_json!.length; i++) {
    for (let j=0; j < tags.length; j++) {
      if (oneItem.tags_list_json![i].id === tags[j].id) {
        return true;
      }
    }
  }
  return false;
}




export const TCTag_removeTagFromTagListById = (tagList: TCTagModel[], tag: TCTagModel): TCTagModel[] => {
  let newArr: TCTagModel[] = [];
  //console.log('array in', tagList);
  for (let i=0; i < tagList.length; i++)  {
    //console.log(tagList[i], tagList[i].id !== tag.id);
    if (tagList[i].id !== tag.id) {
      newArr.push(tagList[i]);
    }
  }
  //console.log('array out', newArr);
  return newArr;
}





