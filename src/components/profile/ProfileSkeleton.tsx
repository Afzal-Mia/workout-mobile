import React from "react";
import { View, ScrollView } from "react-native";
import { Skeleton } from "../ui/Skeleton";

export function ProfileSkeleton() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        {/* Header / Avatar Skeleton */}
        <View style={{ alignItems: "center", marginTop: 24, marginBottom: 32 }}>
          <Skeleton width={112} height={112} borderRadius={56} />
          <Skeleton width={192} height={24} style={{ marginTop: 20 }} />
          <Skeleton width={128} height={16} style={{ marginTop: 12 }} />
        </View>

        <View style={{ gap: 24, paddingBottom: 48 }}>
          {/* Stats Row Skeleton */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#f9fafb",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <View style={{ alignItems: "center", flex: 1 }}>
              <Skeleton width={40} height={28} style={{ marginBottom: 8 }} />
              <Skeleton width={56} height={14} />
            </View>
            <View style={{ width: 1, backgroundColor: "#e5e7eb" }} />
            <View style={{ alignItems: "center", flex: 1 }}>
              <Skeleton width={40} height={28} style={{ marginBottom: 8 }} />
              <Skeleton width={56} height={14} />
            </View>
            <View style={{ width: 1, backgroundColor: "#e5e7eb" }} />
            <View style={{ alignItems: "center", flex: 1 }}>
              <Skeleton width={40} height={28} style={{ marginBottom: 8 }} />
              <Skeleton width={56} height={14} />
            </View>
          </View>

          {/* Info Card Skeleton */}
          <View
            style={{
              backgroundColor: "#f9fafb",
              borderRadius: 16,
              padding: 20,
              gap: 20,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Skeleton width={128} height={20} />
              <Skeleton width={64} height={32} borderRadius={16} />
            </View>
            <View style={{ gap: 20 }}>
              <View>
                <Skeleton width={80} height={14} style={{ marginBottom: 8 }} />
                <Skeleton height={48} borderRadius={12} />
              </View>
              <View>
                <Skeleton width={112} height={14} style={{ marginBottom: 8 }} />
                <Skeleton height={48} borderRadius={12} />
              </View>
              <View>
                <Skeleton width={96} height={14} style={{ marginBottom: 8 }} />
                <Skeleton height={48} borderRadius={12} />
              </View>
            </View>
          </View>

          {/* Options List Skeleton */}
          <View style={{ gap: 12, marginTop: 8 }}>
            <Skeleton height={56} borderRadius={12} />
            <Skeleton height={56} borderRadius={12} />
            <Skeleton height={56} borderRadius={12} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
