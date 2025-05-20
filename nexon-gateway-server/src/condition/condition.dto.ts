export enum ConditionType {
  CONTINUOUSLOGIN = 'ContinuousLoginCondition',
  OWNTARGETITEM = 'OwnTargetItemCondition',
  KILLTARGETMONSTER = 'KillTargetMonsterCondition',
  CLEARTARGETQUEST = 'ClearTargetQuestCondition',
}

export class CreateConditionDto {
  type: ConditionType; // 조건 타입
}

export class CreateClearTargetQuestConditionDto extends CreateConditionDto {
  questId: string; // 퀘스트 ID
}

export class CreateContinuousLoginConditionDto extends CreateConditionDto {
  days: number; // 연속 로그인 일수
}

export class CreateKillTargetMonsterConditionDto extends CreateConditionDto {
  monsterName: string; // 몬스터 이름
  quantity: number; // 몬스터 처치 수량
}

export class CreateOwnTargetItemConditionDto extends CreateConditionDto {
  itemId: string; // 아이템 ID
  quantity: number; // 아이템 수량
}
