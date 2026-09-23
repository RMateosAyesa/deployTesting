import React, { useState, useRef } from "react";
import dayjs from "dayjs";
import { Modal } from "antd";
import type { ModalProps } from "antd";
import styled from "styled-components";
import { AnomalyOptionType } from "../../Molecules/AnomalyOption";
import { Text } from "../../Atoms/Text";
import { RangeSlider } from "../../Atoms/RangeSlider";

import { getAnomalyHeader } from "../../../utils/anomalyHeaderConfig";
import { theme } from "../../../../styles/theme";
import { Button } from "../../Atoms/Button";
import { RadioButton } from "../../Atoms/RadioButton";
import { DatePicker } from "../../Atoms/DatePicker";

export type AnomalyModalFormMode =
  | "runNow"
  | "runInMinutes"
  | "scheduleDateTime";

export interface AnomalyModalData {
  nodeName: string;
  metrics: string[];
}

export interface AnomalyModalProps extends Omit<ModalProps, "children"> {
  anomalyType: AnomalyOptionType;
  selectedOption: string;
  data: AnomalyModalData;
  formMode?: AnomalyModalFormMode;
  onFormModeChange?: (mode: AnomalyModalFormMode) => void;
  onRangeChange?: (value: number) => void;
  onDateChange?: (date: string) => void;
  onAccept?: (
    mode: AnomalyModalFormMode,
    payload: Record<string, unknown>,
  ) => void;
  rangeValue?: number;
  dateValue?: string;
}

const ModalPortalWrapper = styled.div`
  .ant-modal {
    max-width: 100%;
  }

  .ant-modal-container {
    background-color: ${theme.colors.backgroundLow};
    padding: ${theme.padding.lg} ${theme.padding.xl};
  }

  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-close {
    top: 16px;
    right: 16px;
    color: ${theme.colors.contentMid};

    &:hover {
      color: ${theme.colors.contentHigh};
    }
  }

  .ant-modal-mask {
    background-color: ${theme.colors.contentOverlay};
  }
`;

export function AnomalyModal({
  anomalyType,
  selectedOption,
  data,
  formMode = "runNow",
  onFormModeChange,
  onRangeChange,
  onDateChange,
  onAccept,
  rangeValue = 0,
  dateValue,
  ...modalProps
}: AnomalyModalProps): React.ReactElement {
  const header = getAnomalyHeader(anomalyType, selectedOption);
  const [internalMode, setInternalMode] =
    useState<AnomalyModalFormMode>(formMode);
  const [internalRange, setInternalRange] = useState(rangeValue);
  const [internalDate, setInternalDate] = useState<string | undefined>(
    dateValue,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentMode = onFormModeChange !== undefined ? formMode : internalMode;
  const currentRange = onRangeChange !== undefined ? rangeValue : internalRange;
  const currentDate = onDateChange !== undefined ? dateValue : internalDate;

  const handleModeChange = (value: AnomalyModalFormMode) => {
    if (onFormModeChange) {
      onFormModeChange(value);
    } else {
      setInternalMode(value);
    }
  };

  const handleRangeChange = (value: number) => {
    if (onRangeChange) {
      onRangeChange(value);
    } else {
      setInternalRange(value);
    }
  };

  const handleDateChange = (_date: unknown, dateString: string) => {
    if (onDateChange) {
      onDateChange(dateString);
    } else {
      setInternalDate(dateString);
    }
  };

  const handleAccept = () => {
    const payload: Record<string, unknown> = {};
    if (currentMode === "runInMinutes") {
      payload.minutes = currentRange;
    } else if (currentMode === "scheduleDateTime") {
      payload.date = currentDate;
    }
    if (onAccept) {
      onAccept(currentMode, payload);
    }
  };

  return (
    <ModalPortalWrapper ref={wrapperRef}>
      <Modal
        getContainer={() => wrapperRef.current || document.body}
        width={742}
        footer={[
          <Button
            key="cancel"
            variant="outlined"
            fontSize="default"
            onClick={() =>
              modalProps.onCancel?.(
                null as unknown as React.MouseEvent<HTMLButtonElement>,
              )
            }
          >
            Cancel
          </Button>,
          <Button
            key="accept"
            variant="solid"
            fontSize="default"
            onClick={handleAccept}
          >
            Accept anomaly
          </Button>,
        ]}
        {...modalProps}
      >
        <ModalContent>
          <HeaderSection>
            <Text variant="info" color={theme.colors.contentMid}>
              {data.nodeName}
            </Text>
            <Text variant="h1" color={theme.colors.contentHigh}>
              {header.title}
            </Text>
            <Text variant="bodyLarge" color={theme.colors.contentMid}>
              {header.description}
            </Text>
          </HeaderSection>
          <BodySection>
            <SectionTitle
              variant="bodyLargeBold"
              color={theme.colors.contentHigh}
            >
              Schedule anomaly scenario
            </SectionTitle>
            <RadioGroup>
              <RadioOptionCard>
                <RadioButton
                  label="Run now"
                  value="runNow"
                  checked={currentMode === "runNow"}
                  onChange={() => handleModeChange("runNow")}
                />
                <RadioContent>
                  <Text variant="info" color={theme.colors.contentMid}>
                    Start the anomaly immeditely on this host.
                  </Text>
                </RadioContent>
              </RadioOptionCard>
              <RadioOptionCard>
                <RadioButton
                  label="Run in a few minutes"
                  value="runInMinutes"
                  checked={currentMode === "runInMinutes"}
                  onChange={() => handleModeChange("runInMinutes")}
                />
                <RadioContent>
                  <RangeSlider
                    min={1}
                    max={60}
                    value={currentRange}
                    onChange={handleRangeChange}
                  />
                </RadioContent>
              </RadioOptionCard>
              <RadioOptionCard>
                <RadioButton
                  label="Schedule date and time"
                  value="scheduleDateTime"
                  checked={currentMode === "scheduleDateTime"}
                  onChange={() => handleModeChange("scheduleDateTime")}
                />
                <RadioContent>
                  <DatePicker
                    value={currentDate ? dayjs(currentDate) : undefined}
                    onChange={handleDateChange}
                  />
                </RadioContent>
              </RadioOptionCard>
            </RadioGroup>
            <MetricsInfo>
              <Text variant="bodyMediumBold" color={theme.colors.contentHigh}>
                Affected metrics
              </Text>
              <Text variant="info" color={theme.colors.contentMid}>
                {data.metrics.join("; ")}
              </Text>
            </MetricsInfo>
          </BodySection>
        </ModalContent>
      </Modal>
    </ModalPortalWrapper>
  );
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.backgroundLow};
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  background-color: ${theme.colors.backgroundLow};
`;

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${theme.spacing.xl};
  gap: ${theme.spacing.md};
`;

const SectionTitle = styled(Text)`
  color: ${theme.colors.contentHigh};
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const RadioOptionCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  padding: ${theme.padding.lg};
  background-color: ${theme.colors.backgroundLowest};
  border-radius: ${theme.borderRadius.md};
`;

const RadioContent = styled.div`
  padding-left: ${theme.spacing.lg};
`;

const MetricsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;
