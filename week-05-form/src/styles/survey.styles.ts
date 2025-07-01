import styled from '@emotion/styled';

export const FormContainer = styled.form`
    max-width: 560px;
    margin: 4rem auto;
    padding: 2.5rem 2rem;
    background: #ffffff;
    border: 1px solid #eee;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: 'Pretendard', sans-serif;
`;

export const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
`;

export const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
    color: #1c1c1e;
`;

export const Input = styled.input`
    padding: 0.75rem 1rem;
    border: 1px solid #d1d1d6;
    border-radius: 10px;
    font-size: 0.95rem;
    background-color: #fafafa;
    transition: all 0.2s;
    &:focus {
        border-color: #6366f1;
        background-color: #fff;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        outline: none;
    }
`;

export const Textarea = styled.textarea`
    padding: 0.75rem 1rem;
    border: 1px solid #d1d1d6;
    border-radius: 10px;
    font-size: 0.95rem;
    resize: vertical;
    background-color: #fafafa;
    min-height: 120px;
    transition: all 0.2s;
    &:focus {
        border-color: #6366f1;
        background-color: #fff;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        outline: none;
    }
`;

export const CheckboxGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
`;

export const ErrorText = styled.p`
    color: #ef4444;
    font-size: 0.85rem;
    margin-top: -0.3rem;
`;

export const SubmitButton = styled.button`
    padding: 0.9rem;
    background: #6366f1;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.25s ease;

    &:hover {
        background: #4f46e5;
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const RadioGroup = styled.div`
    display: flex;
    gap: 1.2rem;
`;

export const ResultBox = styled.div`
    max-width: 560px;
    margin: 4rem auto;
    padding: 2.5rem;
    background: #fff;
    border-radius: 16px;
    border: 1px solid #eee;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const ResultItem = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ResultLabel = styled.span`
    font-weight: 600;
    font-size: 0.95rem;
    color: #1c1c1e;
    margin-bottom: 0.25rem;
`;

export const ResultValue = styled.span`
    font-size: 1rem;
    color: #444;
`;
