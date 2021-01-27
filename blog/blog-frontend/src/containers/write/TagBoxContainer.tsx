import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagBox from '../../components/write/TagBox';
import { RootState } from '../../modules';
import { changeField } from '../../modules/write';

const TagBoxContainer: React.FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector(({ write }: RootState) => write.tags);

  const onChangeTags = useCallback(
    (nextTags: Array<string>) => {
      dispatch(
        changeField({
          key: 'tags',
          value: nextTags,
        }),
      );
    },
    [dispatch],
  );

  return <TagBox tags={tags} onChangeTags={onChangeTags}></TagBox>;
};

export default TagBoxContainer;
