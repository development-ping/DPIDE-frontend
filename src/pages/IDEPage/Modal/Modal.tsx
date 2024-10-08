import React, { SetStateAction } from 'react';
import {
  ErrorMessage,
  ModalButton,
  ModalContainer,
  ModalContent,
  ModalForm,
  ModalInput,
  ModalInputBox,
  ModalPopup,
  ModalTitle,
  ModalTop,
} from './Modal.style';
import { IoClose } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import FriendRequest from '../../../apis/IDE/Friend/FriendRequest';
import { toast } from 'react-toastify';

interface Props {
  setFriend: React.Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setFriend }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IForm>();
  const { projectId } = useParams();
  const id = Number(projectId);

  const [cookies] = useCookies(['Authorization', 'userId']);
  const Authorization = cookies['Authorization'];

  interface IForm {
    email: string;
  }
  const onSubmitHandler = async (data: IForm) => {
    const { email } = data;
    try {
      const response = await FriendRequest(id, email, Authorization);

      if (!response) {
        alert('네트워크 이상입니다.');
        return;
      }

      const { status } = response;
      if (status === 200) {
        toast.success('친구초대가 완료되었습니다!', {
          autoClose: 2000,
          pauseOnHover: false,
        });
        reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { data } = error.response;
          toast.error(data.message, {
            pauseOnHover: false,
          });
        }
      }
    }
  };
  return (
    <ModalContainer>
      <ModalPopup>
        <ModalTop>
          <IoClose size="20" onClick={() => setFriend(false)} style={{ cursor: 'pointer' }} />
        </ModalTop>

        <ModalContent>
          <ModalTitle>프로젝트 초대</ModalTitle>
          <ModalForm onSubmit={handleSubmit(onSubmitHandler)}>
            <ModalInput>
              <ModalInputBox>
                <input
                  placeholder="이메일"
                  type="text"
                  {...register('email', {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  })}
                />
              </ModalInputBox>
              {errors.email && errors.email?.type === 'required' && <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>}
              {errors.email && errors.email?.type === 'pattern' && (
                <ErrorMessage>올바른 이메일 주소를 입력해주세요.</ErrorMessage>
              )}
            </ModalInput>

            <ModalButton type="submit">초대</ModalButton>
          </ModalForm>
        </ModalContent>
      </ModalPopup>
    </ModalContainer>
  );
};

export default Modal;
