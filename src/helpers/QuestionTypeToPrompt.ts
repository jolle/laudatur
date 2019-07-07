import { QuestionType, QnAQuestionResponse } from '../api/QnA';
import { NumberInput } from '../components/prompts/NumberInput';
import { MultipleChoice } from '../components/prompts/MultipleChoice';
import { Freeform } from '../components/prompts/Freeform';
import { FillableTable } from '../components/prompts/FillableTable';

export default (
  type: QuestionType
): (({
  question,
  checkable
}: {
  question: QnAQuestionResponse;
  checkable: boolean;
}) => JSX.Element) =>
  ({
    [QuestionType.FREEFORM]: Freeform,
    [QuestionType.MULTIPLE_CHOICE]: MultipleChoice,
    [QuestionType.NUMBER]: NumberInput,
    [QuestionType.CHEMISTRY_BALANCED_EQUATIONS]: Freeform,
    [QuestionType.FILLABLE_TABLE]: FillableTable
  }[type]);
