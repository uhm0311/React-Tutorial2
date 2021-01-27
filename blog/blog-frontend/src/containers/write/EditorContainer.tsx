import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../components/write/Editor';
import { RootState } from '../../modules';
import { changeField, initialize, WritePayload } from '../../modules/write';

const EditorContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }: RootState) => ({
    title: write.title,
    body: write.body,
  }));
  const onChangeField = useCallback(
    (payload: WritePayload) => dispatch(changeField(payload)),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <Editor onChangeField={onChangeField} title={title} body={body}></Editor>
  );
};

export default EditorContainer;
